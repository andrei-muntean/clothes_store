import { IProduct } from './models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://18.197.19.50:3200/product';
  private products = new BehaviorSubject<IProduct[]>(undefined);
  productsObs = this.products.asObservable();
  // this is used for cart icon to update its current value
  private productsNr = new BehaviorSubject<number>(0);
  productsNrObs = this.productsNr.asObservable();

  constructor(private _http: HttpClient) { }

  /**
   * Request all products
   */
  getAll(): Observable<any> {
    return this._http.get(this.url);
  }

  /**
   * Request the product for specified id
   * @param productId - id of the requested product
   */
  getProduct(productId): Observable<any> {
    let prodUrl = this.url + '/' + productId;
    return this._http.get(prodUrl);
  }
  
  /**
   * Add a new product in cart
   * @param product - product to add in cart
   */
  addProductToCart(product: IProduct): void {
    let newProducts = this.products.getValue();
    if (!newProducts) {
      newProducts = [];
    }
    newProducts.push(product);
    this.products.next(newProducts);
  }

  /**
   * Remove given product from cart
   * @param product - product to remove
   */
  removeProductFromCart(product: IProduct) {
    let newProducts = this.products.getValue();
    let index = newProducts.indexOf(product);
    newProducts.splice(index, 1);
    this.products.next(newProducts);
  }

  /**
   * Update the current number of products in cart
   * @param increase - true if the current number should be increased, false otherwise
   */
  updateNrProds(increase: boolean) {
    let newProductNr = increase ? this.productsNr.getValue() + 1 : this.productsNr.getValue() - 1;
    this.productsNr.next(newProductNr);
  }
}
