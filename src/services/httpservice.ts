import { HttpClient, json } from "aurelia-fetch-client";
import { Lazy, inject } from "aurelia-framework";

@inject(Lazy.of(HttpClient))
export class HttpService {

  public users;
  http: HttpClient;
  access_token: string;

  constructor(public getHttpClient: () => HttpClient, http) {
    this.getHttpClient = getHttpClient;
    this.http = http;
    var test = window.localStorage.getItem("response");
    var testObject = JSON.parse(test);
    if (testObject && testObject.access_token)
      this.access_token = testObject.access_token;
      this.http = this.getHttpClient();
      this.http.configure(config => {
        config
          .useStandardConfiguration()
          .withBaseUrl("http://10.5.10.69/");
      });
  }

  public get(url) {
    this.http
      .fetch(url, {
        headers: new Headers({
          "Authorization": "Bearer " + this.access_token
        })
      })
      .then(response => response.json())
      .then(data => {
        let users = data.map((data)=>{
          return (data.firstName + " " + data.lastName)
        })
        console.log("users:  " + users);
        
        return users
      });
  }
}
