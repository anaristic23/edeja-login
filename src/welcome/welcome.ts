import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";

@inject(Router)
export class Welcome {

styleObjectH1
styleObjectButtons

  constructor(private router: Router) {
    this.styleObjectH1 = {"color": "red", "align": "center", "font-size":"5rem", "margin" : "300px auto 100px"}
  }

  public chooseLogin() {
    this.router.navigateToRoute("login")
  }

  public chooseRegister(){
    this.router.navigateToRoute("register")
  }
}
