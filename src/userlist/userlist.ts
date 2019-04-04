import { inject } from "aurelia-framework";
import { HttpService } from "../services/httpservice";

@inject(HttpService)
export class Users {
  public http: HttpService;
  users: Array<any> = [];

  constructor(http: HttpService) {
    this.http = http;
  }

  attached() {
    this.onLoadUsers();
  }

  public onLoadUsers() {
    this.http.get("primer/api/users")
    .then(data => {
        this.users = data.map((data)=>{
        return (data)
      })
      return this.users.sort((currentUser, nextUser) => nextUser.id - currentUser.id)
    });
  }
}
