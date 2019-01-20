import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = 'https://api.ancamorar.com/category';

  constructor(private _http: HttpClient) { }

  getCategories(): Observable<any> {
    return this._http.get(this.url);
  }
}
