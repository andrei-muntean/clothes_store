import { Component } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  model: any = {}; // form model
  submited = false;

  constructor(private contactService: ContactService) { }

  onSubmit() {
    this.submited = true;
    this.contactService.contact(this.model).subscribe(value => console.log(value));
  }
}
