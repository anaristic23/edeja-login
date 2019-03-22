import { autoinject} from 'aurelia-dependency-injection';
import {
  ValidationControllerFactory,ValidationController,
  ValidationRules, validationMessages,
} from "aurelia-validation";

@autoinject
export class Register {
  public registrationModel = {
    firstName: '',
    lastName: '',
    email: '',
  };

  public controller: ValidationController;

  constructor(controllerFactory: ValidationControllerFactory){
    this.controller = controllerFactory.createForCurrentScope();

    ValidationRules
      .ensure('firstName')
        .required()
        .withMessage("You must enter your name!")
      .ensure('lastName')
        .required()
        .withMessage("You must enter your surname!")
      .ensure('email')
        .required()
        .email()
        .on(this.registrationModel)

        this.controller.validate()

  }

  public register(){
    console.log(this.registrationModel)
  }

}
