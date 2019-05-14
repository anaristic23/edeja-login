import { log } from './logger';
import { IHttpService } from './httpservice';

export class HttpServiceMock implements IHttpService {
  setToken(url: any, model: any) {
    throw new Error("Method not implemented.");
  }
  get(url: any) {
    throw new Error("Method not implemented.");
  }
  getById(url: any, id: any) {
    throw new Error("Method not implemented.");
  }
  create(url: any, model: any) {
    throw new Error("Method not implemented.");
  }
  update(url: any, model: any, id: any) {
    throw new Error("Method not implemented.");
  }
  delete(url: any, id: any) {
    throw new Error("Method not implemented.");
  }
  formDataTransform(obj: any) {
    throw new Error("Method not implemented.");
  }
  // public create(url, model){
  //   return new Promise ((resolve, reject) => {
  //     resolve({
  //       name: "bla bla"
  //     });
  //   });
  // }

  public print() {
    log.info("this is mock")
  }
}
