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
        moduleId: PLATFORM.moduleName("./login"),
        nav: true,
        title: "Login"
      }
    ]);

    this.router = router;
  }
}
