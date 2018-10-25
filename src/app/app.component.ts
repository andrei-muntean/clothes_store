import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Anca Morar';
  showFooter: boolean = false;

  constructor(location: Location, router: Router) {
    // don't show footer on home page
    router.events.subscribe((val => {
      if(location.path() === '') {
        this.showFooter = false;
      }
      else {
        this.showFooter = true;
      }
    }))
  }
}
