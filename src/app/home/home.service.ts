import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPromotion } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = 'http://18.197.19.50:3200/product/promotion';
  private promotions = new BehaviorSubject<IPromotion[]>(undefined);
  promotionsObs = this.promotions.asObservable();
  
  constructor(private _http: HttpClient) {
   }

  public getAll(): Observable<any> {
    return this._http.get(this.url);
  }
}
