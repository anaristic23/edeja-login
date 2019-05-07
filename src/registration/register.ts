import { HttpService } from './../services/httpservice';
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { HttpServiceMock } from "../services/httpServiceMock";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules,
  validationMessages
} from "aurelia-validation";

@inject(ValidationControllerFactory, HttpService, HttpServiceMock, Router)
export class Register {
  public registrationModel = {
    firstName: "",
    lastName: "",
    email: ""
  };

  public controller: ValidationController;
  public http: HttpService;
  public httpMock: HttpServiceMock
  public isFormInvalid: boolean;

  constructor(controllerFactory: ValidationControllerFactory, http: HttpService, httpMock: HttpServiceMock, private router: Router) {
    this.http = http;
    this.httpMock = httpMock
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

  public register() {
    this.http.create("primer/api/users", this.registrationModel)
      .then(data => {
        data;
        this.router.navigateToRoute("userlist")
      })

  }

  pressedSubmitButton() {
    this.controller.validate().then((result) => {

      if (result.valid) {
        this.register();
      }
    })
  }

  pressedMockButton() {
    this.httpMock.create("primer/api/users", this.registrationModel)
      .then(data => console.log(data))
  }
}
