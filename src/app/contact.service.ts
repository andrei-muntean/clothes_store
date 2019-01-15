import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = 'http://18.222.40.189:3200/contact';
  // Headers?
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private _http: HttpClient) { }

  contact(model: any) {
    let data = JSON.stringify(model);// json of model to send to server
    console.log(data);
    return this._http.post(this.url, data, this.httpOptions);
  }
}
