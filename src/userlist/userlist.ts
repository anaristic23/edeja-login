import { HttpClient, json } from 'aurelia-fetch-client';
import { Lazy, inject } from 'aurelia-framework';

@inject(Lazy.of(HttpClient))
export class Users {

  public userModel: object = {
    name: "",
    email: ""
  }
  public users =[]; 
  public http;
  access_token: string;

  constructor (private getHttpClient: () => HttpClient){
    this.getHttpClient = getHttpClient;
    var test = window.localStorage.getItem("response");
    var testObject = JSON.parse(test);
    if (testObject && testObject.access_token) this.access_token = testObject.access_token;
  }

  activate() {
    this.http = this.getHttpClient();

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl("http://10.5.10.69/security/connect/token");
    });
  }

  public onLoadUsers(){
    this.http.fetch("", {
      method: "get",
      headers: {
        "Authorization" : "Bearer " + this.access_token
      }
    }).then(response => response.json())
    .then(response => {
      console.log(response);
    })
  }
}
