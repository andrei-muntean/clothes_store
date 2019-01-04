import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Anca Morar';
  showFooter: boolean = false;
  showNavBar: boolean = false;

  constructor(location: Location, router: Router) {
    // don't show footer on home page
    router.events.subscribe((val => {
      this.showFooter = location.path() !== '';
      this.showNavBar = !location.path().includes('catalog');
    }))
  }
}
