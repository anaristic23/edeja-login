import { Aurelia } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Edeja";
    config.map([
      {
        route: ["", "login"],
        name: "login",
        moduleId: PLATFORM.moduleName("./login/login"),
        nav: true,
        title: "Login"
      },
      {
        route: ["register"],
        name: "register",
        moduleId: PLATFORM.moduleName("./registration/register"),
        nav: true,
        title: "Register"
      },
      {
        route: ["userlist"],
        name: "userlist",
        moduleId: PLATFORM.moduleName("./userlist/userlist"),
        nav: false,
        title: "User List"
      },
      {
        route: ["profile/:id"],
        name: "profile",
        moduleId: PLATFORM.moduleName("./profile/profile"),
        nav: false,
        title: "Profile Page"
      }
    ]);

    this.router = router;
  }
}
