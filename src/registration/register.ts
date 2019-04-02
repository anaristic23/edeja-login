import { inject } from "aurelia-framework";
import { HttpService } from "../services/httpservice";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules,
  validationMessages
} from "aurelia-validation";

@inject(ValidationControllerFactory, HttpService)
export class Register {
  public registrationModel = {
    firstName: "",
    lastName: "",
    email: ""
  };

  public controller: ValidationController;
  public http: HttpService;
  public registeredUsers;

  constructor(controllerFactory: ValidationControllerFactory, http: HttpService) {
    this.http = http;
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

  attached() {
    this.register();
  }

  public register() {
    this.http
      .create("primer/api/users", this.registrationModel)
      .then(data => {
        this.registeredUsers = data;
      });
    console.log(this.registeredUsers);
  }
}
