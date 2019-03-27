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

    agree: false,
    grant_type:"password",
    username:"",
    password:"",
    client_id: "edeja",
    client_secret: "edeja123",
    scope:"api1"
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
        .withBaseUrl("http://10.5.10.69/security/.well-known/openid-configuration");
    });
  }

  public onLogin() {
    var response = {
      access_token: 1564564654,
      test2: 2
    }
    window.localStorage.setItem("response", JSON.stringify(response))
    console.log(localStorage.getItem("response"))
    this.http
      .fetch("", {
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
