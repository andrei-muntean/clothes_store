import { Component, OnInit } from '@angular/core';
import { ProcesOrderService } from './proces-order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent {

  model: any = {}; // form model
  submited = false;

  constructor(private _processOrder: ProcesOrderService) { }

  onSubmit() {
    this.submited = true;
    this._processOrder.processOrder(this.model);
  }

}
