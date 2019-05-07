import { Router } from "aurelia-router";
import { Lazy, inject } from "aurelia-framework";
// import { HttpClient } from "aurelia-fetch-client";
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
  public controller: ValidationController;
  public http: HttpService;

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
    this.http
      .fetch("security/connect/token", {
        method: "post",
        body: this.formDataTransform(this.formModel),

        headers: {
          "Content-Type": " application/x-www-form-urlencoded"
        }
      })
      .then(response => response.json())
      .then(response => {response;
        localStorage.setItem("token", response.access_token);
        this.router.navigateToRoute("userlist");
      });
  }

  formDataTransform(obj) {
    var str: any = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  pressedLoginButton() {
    this.controller.validate().then(result => {
      if (result.valid) {
        this.onLogin();
      }
    });
  }
}
