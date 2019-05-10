import { Aurelia, inject, observable } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { I18N } from 'aurelia-i18n';
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(I18N, EventAggregator)
export class App {
  router: Router;

  private i18n: I18N;
  private eventAggregator;

  public languages = ["English", "French"];
  @observable selectedLanguage;

  constructor(i18n: I18N, eventAggregator) {
    this.i18n = i18n;
    this.eventAggregator = eventAggregator;

  }

  selectedLanguageChanged(newValue, prevValue) {
    if (newValue == "French") {
      this.i18n.setLocale('fr');
    } else if (newValue == "English") {
      this.i18n.setLocale('en');
    }
    if (prevValue && newValue && prevValue != newValue) {
      this.eventAggregator.publish('changed_language')
    }
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Edeja";
    config.options.pushState = true;

    config.map([
      {
        route: ["", "welcome"],
        name: "welcome",
        moduleId: PLATFORM.moduleName("./welcome/welcome"),
        nav: false,
        title: "Welcome"
      },
      {
        route: ["login"],
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
