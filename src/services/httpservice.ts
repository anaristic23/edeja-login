import { HttpClient, json } from "aurelia-fetch-client";
import { Lazy, inject } from "aurelia-framework";

@inject(Lazy.of(HttpClient))
export class HttpService {
  http: HttpClient;
  access_token: string;

  constructor(public getHttpClient: () => HttpClient, http) {
    this.http = http;
    this.getHttpClient = getHttpClient;
    this.http = this.getHttpClient();
    this.http.configure(config => {
      config.useStandardConfiguration().withBaseUrl("http://10.5.10.69/");
    });
  }

  public get(url) {
    var test = window.localStorage.getItem("response");
    var testObject = JSON.parse(test);
    var access_token = '';
    if (testObject && testObject.access_token)
      access_token = testObject.access_token;
    return this.http
      .fetch(url, {
        headers: new Headers({
          Authorization: "Bearer " + access_token
        })
      })
      .then(response => response.json());
  }

  public getById(url, id) {
    var test = window.localStorage.getItem("response");
    var testObject = JSON.parse(test);
    var access_token = '';
    if (testObject && testObject.access_token)
      access_token = testObject.access_token;
    return this.http
      .fetch(url + "/" + id, {
        headers: new Headers({
          Authorization: "Bearer " + access_token
        })
      })
      .then(response => response.json());
  }

  public create(url, model) {
    var test = window.localStorage.getItem("response");
    var testObject = JSON.parse(test);
    var access_token = '';
    if (testObject && testObject.access_token)
      access_token = testObject.access_token;
    return this.http
      .fetch(url, {
        method: "post",
        body: json(model),
        headers: new Headers({
          Authorization: "Bearer " + access_token
        })
      })
      .then(response => response.json());
  }

  public update(url, model, id){
    var test = window.localStorage.getItem("response");
    var testObject = JSON.parse(test);
    var access_token = '';
    if (testObject && testObject.access_token)
      access_token = testObject.access_token;

      return this.http.fetch(url + "/" + id, {
        method: "put",
        body: json(model),
        headers: new Headers({
          Authorization: "Bearer " + access_token
      })
    })
    .then(response => response.json());
  }

  public delete(url, id) {
    return this.http
      .fetch(url + "/" + id, {
        method: "delete"
      })
      .then(response => response.json());
  }
}
