import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.css']
})
export class HomeNewComponent implements OnInit {

  @Input() newImage: string;

  constructor() { }

  ngOnInit() {
  }

}
