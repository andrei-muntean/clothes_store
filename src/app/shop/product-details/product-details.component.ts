import { ProductsService } from '../../products.service';
import { IStock, IProduct } from '../../models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [
    trigger('carousel', [
      transition('* => *', [
        query('ngb-carousel',style({ transform: 'translateX(-100%)'})),
        query('ngb-carousel',
          stagger('600ms', [
            animate('900ms', style({ transform: 'translateX(0)'}))
        ]))
      ])
    ]),
    trigger('product', [
      transition('* => *', [
        query('ul',style({ transform: 'translateY(100%)'})),
        query('ul',
          stagger('600ms', [
            animate('900ms', style({ transform: 'translateY(0)'}))
        ]))
      ])
    ])
  ]
})
export class ProductDetailsComponent implements OnInit {
  selectedSize = '';
  title: string = '';
  price: number;
  category: string;
  images: any[] = [];
  description: any[] = [];
  care: any[] = [];
  stocks: IStock[] = [];
  product: IProduct;

  constructor(
    private _productService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    carouselConfig: NgbCarouselConfig
  ) {
    // carousel configuration
    carouselConfig.showNavigationArrows = false;
    carouselConfig.showNavigationIndicators = true;
    carouselConfig.pauseOnHover = true;
    carouselConfig.interval = 15000;
  }

  ngOnInit() {
    this._activeRoute.params.subscribe(
      params => {
        const id = +params['id'];
        this._productService.getProduct(id).subscribe((product: any) => {
          this.images = product.images;
          this.stocks = product.stocks;
          this.selectedSize = this.stocks[0].size;
          this.title = product.name;
          this.price = product.price;
          this.category = product.category.name;
          this.description = product.description;
          this.care = product.care;
          this.product = product;
        });
      });
  }

  nextProduct() {
    let nextId: number = this.product.productId + 1;
    let id: number = nextId === 4 ? 1 : nextId;
    this._router.navigate(['/catalog/' + id]);
  }
  prevProduct() {
    let prevId: number = this.product.productId - 1;
    let id: number = prevId === 0 ? 3 : prevId;
    this._router.navigate(['/catalog/' + id]);
  }
  /**
   * Change current selected size to specified one
   * @param value - new size value
   */
  changeSize(value: any) {
    this.selectedSize = value;
  }

  /**
   * add product to cart and update the number of products
   */
  addProdToCart() {
    this._productService.addProductToCart(this.product);
    this._productService.updateNrProds(true);
  }
}
