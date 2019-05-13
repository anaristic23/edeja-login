
import { inject } from "aurelia-framework";
import { HttpService } from "../services/httpservice";

@inject(HttpService)
export class Users {
  public http: HttpService;
  users: Array<any> = [];
  // styleObjectButton


  constructor(http: HttpService) {
    this.http = http;
    // this.styleObjectButton = {
    //   "position": "fixed",
    //   "width": "80px",
    //   "height": "60px",
    //   "bottom": "40px",
    //   "right": "40px",
    //   "background-color": "#06C",
    //   "color": "#FFF",
    //   "border-radius": "50px",
    //   "text-align": "center",
    //   "box-shadow": "2px 2px 3px #999",

    // }
  }

  attached() {
    this.onLoadUsers();
  }

  public onLoadUsers() {
    this.http.get("primer/api/users")
      .then(data => {
        this.users = data.map((data) => {
          return (data)
        })
        return this.users.sort((currentUser, nextUser) => nextUser.id - currentUser.id)
      });
  }

  // public logout() {
  //   this.http.setToken("primer/api/users", this.users)
  //   .then(() => localStorage.removeItem("token"))
  // }
}
