import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPromotion } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url = 'http://18.222.40.189:3200/promotion';
  private promotions = new BehaviorSubject<IPromotion[]>(undefined);
  promotionsObs = this.promotions.asObservable();
  
  constructor(private _http: HttpClient) {
   }

  public getPromotionItems(): Observable<any> {
    return this._http.get(this.url);
  }
}
