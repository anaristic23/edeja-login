export class HttpServiceMock {
  public create(url, model){
    return new Promise ((resolve, reject) => {
      resolve({
        name: "bla bla"
      });
    });
  }
}
