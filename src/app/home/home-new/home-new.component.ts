import { trigger, animate, keyframes, transition } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import * as kf from '../../../animations'

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.css'],
  animations: [
    trigger('images', [
      transition('* => fadeIn0sec', animate(500, keyframes(kf.fadeInUp))),
      transition('* => fadeIn2sec', animate(700, keyframes(kf.fadeInUp))),
      transition('* => fadeIn4sec', animate(900, keyframes(kf.fadeInUp)))
    ])
  ]
})
export class HomeNewComponent implements OnInit {

  @Input() newImage: string;

  constructor() { }

  ngOnInit() {
  }

}
