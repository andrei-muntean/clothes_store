import { IProduct, IProducttDefinition } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://18.222.40.189:3200/product';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  // products
  allProducts: IProduct[];
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
   * Get specified number of products per page
   * @param page 
   * @param nrProducts 
   */
  getProducts(page: number, nrProducts: number, categoryId: number) {
    return this._http.get(this.url, {
      params: {
        offset: page.toString(),
        limit: nrProducts.toString(),
        c: categoryId.toString()
      }
    });
  }

  /**
   * Request the product for specified id
   * @param productId - id of the requested product
   */
  getProduct(productId): Observable<any> {
    let prodUrl = this.url + '/' + productId;
    return this._http.get(prodUrl);
  }

  getNavigationProduct(productId: number): Observable<any> {
    let prodUrl = this.url + '/' + productId + '/navigation';
    return this._http.get(prodUrl);
  }

  addProduct(product: IProducttDefinition): Observable<any> {
    console.log(product);
    return this._http.post(this.url, JSON.stringify(product), this.httpOptions);
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

  slideToNextProduct(product: IProduct, next: boolean): IProduct {
    if (!this.allProducts) {
      // products
      this.getAll().subscribe((data: IProduct[]) => {
        // request products
        this.allProducts = data;
      });
    }
    this.allProducts.forEach(
      (item, index) => {
        if (item === product) {
          let prodIndex = next ? index + 1 : index - 1;
          prodIndex = prodIndex === 0 ? this.allProducts.length - 1 : prodIndex;
          prodIndex = prodIndex === this.allProducts.length ? 1 : prodIndex;
          return this.allProducts[prodIndex];
        }
      }
    );
    return null;
  }
}
