import { keyframes, transition, animate, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as kf from '../../animations'

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'], 
  animations: [
    trigger('pageDiv', [
      transition('* => fadeIn', animate(800, keyframes(kf.fadeIn)))
    ])
  ]
})
export class AboutMeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
