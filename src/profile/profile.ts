import { HttpService } from './../services/httpservice';
import {inject} from "aurelia-framework"

@inject(HttpService)

export class UserProfile {
  public http: HttpService;
  id: string;
  user;

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
    .then(user => this.user = user)
  }
}
