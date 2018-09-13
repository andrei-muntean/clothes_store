import { ProductsService } from '../../products.service';
import { IStock, IProduct } from '../../models';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  selectedSize = '';
  title: string = '';
  price: number;
  images: any[] = [];
  description: any[] = [];
  care: any[] = [];
  stocks: IStock[] = [];
  product: IProduct;

  constructor(
    private _productService: ProductsService,
    activeRoute: ActivatedRoute,
    carouselConfig: NgbCarouselConfig
  ) {
    // id of selected product
    let id = activeRoute.snapshot.paramMap.get('id');
    // request product for current id
    _productService.getProduct(id).subscribe((product: any) => {
      this.images = product.images;
      this.stocks = product.stocks;
      this.selectedSize = this.stocks[0].size;
      this.title = product.name;
      this.price = product.price;
      this.description = product.description;
      this.care = product.care;
      this.product = product;
    });
    // carousel configuration
    carouselConfig.showNavigationArrows = true;
    carouselConfig.showNavigationIndicators = false;
  }

  /**
   * Change current selected size to specified one
   * @param value - new size value
   */
  changeSize(value: any) {
    this.selectedSize = value;
  }

  addProdToCart() {
    this._productService.addProductToCart(this.product);
    this._productService.updateNrProds(true);
  }
}
