import { IPromotion } from '../models';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  promotions: IPromotion[] = [];

  constructor(homeService: HomeService, config: NgbCarouselConfig) {
    // load images
    homeService.getAll().subscribe((data: any) => { 
      console.log(data);
      this.promotions = data;
    });
    // config carousel
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
   }

}
