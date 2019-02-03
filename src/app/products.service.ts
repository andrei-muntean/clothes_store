import { IProduct, IProducttDefinition } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


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
    let params: HttpParams = new HttpParams()
      .set('offset', page.toString())
      .set('limit', nrProducts.toString());

    if (categoryId) {
      if (categoryId !== -1) {
        params = params.set('c', categoryId.toString());
      } else {
        params = params.set('favourite', 'true');
      }
    }
    return this._http.get(this.url, { params: params });
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
  getNavigationProduct(productId: number, categoryId?: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (categoryId !== -1) {
      params = params.set('c', categoryId.toString());
    } 
    else {
      params = params.set('favourite', 'true');
    }
    let prodUrl = this.url + '/' + productId + '/navigation';
    return this._http.get(prodUrl, { params: params });
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
   * Get the total number of products for the specified category
   * @param category 
   */
  getProductCount(category: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (category !== -1) {
      params = params.set('c', category.toString());
    } else {
      params = params.set('favourite', 'true');
    }
    return this._http.get(this.url + '/count', { params: params });
  }
}
