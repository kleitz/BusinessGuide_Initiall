import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
//import { User } from '../providers/auth';

/*
  Generated class for the MessageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {

  private url:string = "http://localhost:3000/";
  private registerUrl:string = "http://localhost:3000/signup";

  constructor(private http: Http) {
    console.log('Hello MessageService Provider');
  }

  getMessages() {
      //  return this.http.get(this.url)
      // .do(this.loginResponse)
      // .map(this.extractData);
  }

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server error");
  }
  private loginResponse(res: Response) {
    console.log(res);
  }

  private extractData(res: Response) {
    return res.json();
  }


}
