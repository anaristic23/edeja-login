import { Lazy, inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from "aurelia-validation";

@inject(Lazy.of(HttpClient), ValidationControllerFactory)
export class Login {
  public formModel: object = {
    email: "",
    password: "",
    agree: false
  };

  public controller: ValidationController;
  public http;
  public users;

  constructor(
    private getHttpClient: () => HttpClient,
    controllerFactory: ValidationControllerFactory
  ) {
    this.getHttpClient = getHttpClient;
    this.controller = controllerFactory.createForCurrentScope();

    ValidationRules.ensure("email")
      .required()
      .email()
      .ensure("password")
      .required()
      .minLength(6)
      .ensure("agree")
      .satisfies(checked => checked === true)
      .on(this.formModel);

    this.controller.validate();
  }

  activate() {
    this.http = this.getHttpClient();

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl("https://jsonplaceholder.typicode.com/");
    });
  }

  public onLogin() {
    this.http
      .fetch("users", {
        method: "post",
        body: json(this.formModel)
      })
      .then(response => {console.log(response.json())})
      .then(response => {
        this.users = response;
        console.log(response)
      });
    console.log(this.formModel);
  }
}
