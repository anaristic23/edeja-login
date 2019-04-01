import { inject } from "aurelia-framework";
import { HttpService } from "../services/httpservice";

@inject(HttpService)
export class Users {
  public http: HttpService;

  constructor(http: HttpService) {
    this.http = http;
  }

  attached() {
    this.onLoadUsers();
  }

  public onLoadUsers() {
    this.http.get("primer/api/users")
  console.log(this.http.users);
  }
}
