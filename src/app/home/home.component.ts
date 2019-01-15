import { HomeService } from '../home.service';
import { Component } from '@angular/core';
import { IImageFile } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  homeImage: string;
  newImage: string;

  constructor(homeService: HomeService) {
    // load images
    homeService.getPromotionItems().subscribe((data: IImageFile[]) => { 
      console.log(data);
      this.homeImage = "https://s3.us-east-2.amazonaws.com/" + data[0].content;
      this.newImage = "https://s3.us-east-2.amazonaws.com/" + data[1].content;
    });
   }

}
