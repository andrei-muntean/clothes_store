import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  products: IProduct[] = [];
  cartQty: number;

  constructor(private _productService: ProductsService) { 
    this._productService.productsObs.subscribe( newProducts => this.products = newProducts);
    this._productService.productsNrObs.subscribe( newCartQty => this.cartQty = newCartQty);
  }

  increaseQty() {

  }

  decreaseQty() {

  }

  removeProduct(product: IProduct) {
    this._productService.removeProductFromCart(product);
    this._productService.updateNrProds(false);
  }
}
