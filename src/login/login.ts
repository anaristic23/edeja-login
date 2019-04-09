import { Router } from "aurelia-router";
import { Lazy, inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from "aurelia-validation";

@inject(Lazy.of(HttpClient), ValidationControllerFactory, Router)
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
  public http;

  constructor(
    private getHttpClient: () => HttpClient,
    controllerFactory: ValidationControllerFactory,
    private router: Router
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
      config.useStandardConfiguration().withBaseUrl("http://10.5.10.69/");
    });
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
        localStorage.setItem("response", JSON.stringify(response));
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
