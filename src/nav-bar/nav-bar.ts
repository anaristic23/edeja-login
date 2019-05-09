import { I18N } from 'aurelia-i18n';
import { Aurelia, inject, observable } from "aurelia-framework";

@inject(I18N)

export class Navigation {
  @observable language;

  public languages = ["English", "French"];
  public selectedLanguage = "";

  constructor() {
    this.language = "English"
  }
  
  selectedLanguageChanged(){
    this.language = "French"
  }
}
