import { I18N } from 'aurelia-i18n';
import { Aurelia, inject, observable } from "aurelia-framework";


@inject(I18N)

export class Navigation {
  @observable language;

  public languages= ["English", "French"]; 
  public selectedLanguage = "";
  public myData;

  constructor() {
    this.language = "English";
    this.myData = 'Enter some text!';
  }
  
  // selectedLanguageChanged(){
  //   this.language = "French";
  // }
}
