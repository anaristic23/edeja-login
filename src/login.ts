import { autoinject } from "aurelia-dependency-injection";
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules,
} from "aurelia-validation";

@autoinject
export class Login {
  public formModel: object = {
    email: '',
    password: '',
    agree: false,
  };

  public controller: ValidationController;

  constructor(controllerFactory: ValidationControllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();

    ValidationRules
      .ensure('email')
        .required()
        .email()
      .ensure('password')
        .required()
        .minLength(6)
      .ensure('agree')
        .satisfies(checked => checked === true)
      .on(this.formModel);
  }

  public onLogin() {
    console.log(this.formModel);
  }
}
