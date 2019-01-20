import { IProduct, IProducttDefinition } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from '../../node_modules/rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'https://api.ancamorar.com/product';
  // products
  allProducts: IProduct[];
  // this is used for cart icon to update its current value

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
   * @param categoryId 
   */
  getProducts(page: number, nrProducts: number, categoryId?: number) {
    return this._http.get(this.url, {
      params: {
        offset: page.toString(),
        limit: nrProducts.toString(),
        c: categoryId !== -1 && categoryId ? categoryId.toString() : undefined,
        favourites: categoryId === -1 ? 'true' : undefined
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
  /**
   * Get the 
   * @param productId 
   */
  getNavigationProduct(productId: number): Observable<any> {
    let prodUrl = this.url + '/' + productId + '/navigation';
    return this._http.get(prodUrl);
  }
  /**
   * Add this product to database
   * @param product 
   */
  addProduct(product: IProducttDefinition): Observable<any> {
    return this._http
      .post(this.url, JSON.stringify(product), { observe: 'response' })
      .pipe(
        map((response: any) => {
          return [{ status: response.status, json: response }];
        }),
        catchError(error => of([{ status: error.status, json: error }]))
      );
  }
  /**
   * Remove a product from the database
   * @param productId 
   */
  removeProduct(productId: number): Observable<any> {
    return this._http
      .delete(this.url + '/' + productId, { observe: 'response' })
      .pipe(
        map((response: any) => {
          return [{ status: response.status, json: response }];
        }),
        catchError(error => of([{ status: error.status, json: error }]))
      );
  }
  /**
   * Edit specified product
   * @param product 
   */
  editProduct(productId: number, product: IProducttDefinition) {
    return this._http.put(this.url + '/' + productId, JSON.stringify(product), { observe: 'response' })
      .pipe(
        map((response: any) => {
          return [{ status: response.status, json: response }];
        }),
        catchError(error => of([{ status: error.status, json: error }]))
      );
  }
  /**
   * 
   * @param product 
   * @param next 
   */
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

  getProductCount(category: number): Observable<any> {
    return this._http.get(this.url + '/count', {
      params: {
        c: category !== -1 ? category.toString() : undefined,
        favourites: category === -1 ? 'true' : undefined
      }
    });
  }
}
