import { HttpService } from './../services/httpservice';
import { inject } from "aurelia-framework";


@inject(HttpService)

export class UserProfile {
  public http: HttpService;
  public isEditing: boolean = false;
  public editModel = {
    firstName: "",
    lastName: "",
    email: ""
  }
  user;
  id: string;

  constructor(http: HttpService) {
    this.http = http;
 }

  activate(params) {
    this.id = params.id;
  }

  attached() {
    this.getProfile();
  }

  public getProfile() {
    this.http.getById("primer/api/users", this.id)
      .then(user => this.user = user)
  }

  public onEdit() {
    this.editModel = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    }
    this.isEditing = true;
  }

  cancel() {
    this.isEditing = false;

  }

  save() {
    this.http.update('primer/api/users', this.editModel, this.id).then((response) => {
      if (response) {
        this.getProfile();
        this.cancel();
      }
    })
  }

}
