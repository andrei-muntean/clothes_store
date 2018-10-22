import { IProduct } from '../models';
import { ProductsService } from '../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartQty: number;
  products: IProduct[] = [];

  constructor(private _productService: ProductsService) {   }

  ngOnInit() {
    this._productService.productsNrObs.subscribe( newCartQty => this.cartQty = newCartQty);
    this._productService.productsObs.subscribe( newProducts => this.products = newProducts);
  }
}
