import { HttpService } from './../services/httpservice';
import {inject} from "aurelia-framework"

@inject(HttpService)

export class UserProfile {
  public http: HttpService;
  id: string;
  user;

  // profile:object = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   id: ""
  // }

  constructor(http: HttpService){
    this.http=http;
  }

  activate(params) {
    this.id = params.id;
  }

  attached(){
    this.getProfile()
  }

  public getProfile(){
    this.http.getById("primer/api/users", this.id)
    .then(data => {
      console.log(data)
      this.user = data
      return data
    })
    return this.user
  }




}
