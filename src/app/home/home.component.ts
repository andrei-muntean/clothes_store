import { trigger, transition, animate, keyframes } from '@angular/animations';
import { HomeService } from '../home.service';
import { Component } from '@angular/core';
import { IImageFile } from '../models';
import * as kf from '../../animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('footButtons', [
      transition('* => fadeInUp0sec', animate(800, keyframes(kf.fadeInUp)))
    ]),
    trigger('images', [
      transition('* => fadeInRight', animate(1000, keyframes(kf.fadeInRight)))
    ])
  ]
})
export class HomeComponent{

  homeImage: string;
  newImage: string;

  constructor(homeService: HomeService) {
    // load images
    homeService.getPromotionItems().subscribe((data: IImageFile[]) => { 
      this.homeImage = "https://s3.us-east-2.amazonaws.com/" + data[0].content;
      this.newImage = "https://s3.us-east-2.amazonaws.com/" + data[1].content;
    });
   }

}
