import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = 'https://api.ancamorar.com/promotion';
  
  constructor(private _http: HttpClient) {
  }

  getPromotionItems(): Observable<any> {
    return this._http.get(this.url);
  }
}
