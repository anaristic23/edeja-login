import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { HttpService } from './../services/httpservice';

import { log } from '../services/logger';
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from "aurelia-validation";

@inject(HttpService, ValidationControllerFactory, Router)
export class Login {
  public formModel: object = {
    grant_type: "password",
    username: "",
    password: "",
    client_id: "edeja",
    client_secret: "edeja123",
    scope: "api1"
  };

  public isLoginValid: boolean;
  public agree: false;
  public http: HttpService;
  public controller: ValidationController;

  constructor(
    http: HttpService,
    controllerFactory: ValidationControllerFactory,
    private router: Router
  ) {
    this.http = http;
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
    log.info("cao ovde sam")
    log.error("error")

  }

  public onLogin() {
    this.http.setToken("security/connect/token", this.formModel)
    // .then(() => {
    //   this.router.navigateToRoute("userlist");
    // })
  }

  pressedLoginButton() {
    this.controller.validate().then(result => {
      if (result.valid) {
        this.onLogin();
      }
    });
  }
}
