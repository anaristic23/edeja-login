import { HttpService } from './../services/httpservice';
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { HttpServiceMock } from "../services/httpServiceMock";
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules,
  validationMessages
} from "aurelia-validation";

@inject(ValidationControllerFactory, HttpService, HttpServiceMock, Router, EventAggregator)
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
  eventAggregator;
  subscription;

  constructor(controllerFactory: ValidationControllerFactory, http: HttpService, httpMock: HttpServiceMock, private router: Router, eventAggregator) {
    this.http = http;
    this.httpMock = httpMock
    this.controller = controllerFactory.createForCurrentScope();
    this.subscription = eventAggregator.subscribe('changed_language', () => { this.controller.reset() })



    ValidationRules.ensure("firstName")
      .required()

      .ensure("lastName")
      .required()

      .ensure("email")
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
    // this.httpMock.create("primer/api/users", this.registrationModel)
    //   .then(data => console.log(data))
  }

  detach() {
    if (this.subscription) {
      this.subscription.dispose();
    }

  }
}
