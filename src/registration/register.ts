import { HttpClient, json } from "aurelia-fetch-client";
import { Lazy, inject } from "aurelia-framework";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules,
  validationMessages
} from "aurelia-validation";

@inject(Lazy.of(HttpClient), ValidationControllerFactory)
export class Register {
  public registrationModel = {
    firstName: "",
    lastName: "",
    email: ""
  };

  public controller: ValidationController;
  public http;
  public registeredUsers;

  constructor(
    private getHttpClient: () => HttpClient,
    controllerFactory: ValidationControllerFactory
  ) {
    this.getHttpClient = getHttpClient;
    this.controller = controllerFactory.createForCurrentScope();

    validationMessages["required"] = `You must enter your \${$displayName}`;

    ValidationRules.ensure("firstName")
      .displayName("First Name")
      .required()

      .ensure("lastName")
      .displayName("Last Name")
      .required()

      .ensure("email")
      .displayName("Email")
      .email()
      .required()
      .on(this.registrationModel);

    this.controller.validate();
  }

  attached(){
    this.http = this.getHttpClient();
    this.http.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl("http://10.5.10.69/primer/api/")
    })
  }

  public register() {
    this.http.fetch("users", {method: 'post', body: json(this.registrationModel)})
    .then(response => response.json())
    .then(data => {this.registeredUsers = data})
    console.log(this.registrationModel);
  }
}
