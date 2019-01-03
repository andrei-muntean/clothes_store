import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = 'http://18.197.19.50:3200/category';

  constructor(private _http: HttpClient) { }

  getCategories(): Observable<any> {
    return this._http.get(this.url);
  }
}
