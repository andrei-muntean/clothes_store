import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = 'http://18.222.40.189:3200/category';

  constructor(private _http: HttpClient) { }

  getCategories(): Observable<any> {
    return this._http.get(this.url);
  }
}
