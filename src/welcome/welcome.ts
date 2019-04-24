import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";

@inject(Router)
export class Welcome {

styleObjectH1

  constructor(private router: Router) {
    this.styleObjectH1 = {"align": "center", "font-size":"5rem", "margin" : "100px auto 100px"}
  }

  public chooseLogin() {
    this.router.navigateToRoute("login")
  }

  public chooseRegister(){
    this.router.navigateToRoute("register")
  }
}
