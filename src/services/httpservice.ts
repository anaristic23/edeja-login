import { HttpClient, json } from "aurelia-fetch-client";
import { Lazy, inject } from "aurelia-framework";

@inject(Lazy.of(HttpClient))
export class HttpService {
  http: HttpClient;
  access_token: string;

  constructor(public getHttpClient: () => HttpClient) {
    this.getHttpClient = getHttpClient;
    this.http = this.getHttpClient();
    this.http.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl("http://10.5.10.69/")
      .withInterceptor({
        request(req){
          const token = JSON.parse(localStorage.getItem("token"))

          if (token){
            req.headers.append("Authorization", `Bearer ${token.access_token}`)
          }
          return req;
        },
        response(res){
          console.log(res);
          return res;
        }
      });
    });
  }

  public get(url) {
    return this.http
      .fetch(url)
      .then(response => 
     response.json()
      )
  }

  public getById(url, id) {
    return this.http
      .fetch(url + "/" + id)
      .then(response => response.json());
  }

  public create(url, model) {
    return this.http
      .fetch(url, {
        method: "post",
        body: json(model)
      })
      .then(response => response.json());
  }

  public update(url, model, id){

      return this.http.fetch(url + "/" + id, {
        method: "put",
        body: json(model)
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
  public setToken(url, model){
    return this.http
    .fetch(url, {
      method: "post",
      body: this.formDataTransform(model),

      headers: {
        "Content-Type": " application/x-www-form-urlencoded"
      }
    })
    .then(response => response.json())
    .then(response => {
      response;
      localStorage.setItem("token", JSON.stringify(response));
    });
  }
  formDataTransform(obj) {
    var str: any = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }
}
