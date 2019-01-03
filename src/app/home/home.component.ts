import { IPromotion, ICategory } from '../models';
import { HomeService } from '../home.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  promotions: IPromotion[] = [];

  constructor(homeService: HomeService) {
    // load images
    homeService.getPromotionItems().subscribe((data: any) => { 
      console.log(data);
      this.promotions = data;
    });
   }

}
