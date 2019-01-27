import { IImageFile } from '../../models';
import { ProductsService } from '../../products.service';
import { IProduct } from '../../models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [
    trigger('carousel', [
      transition('* => *', [
        query('ngb-carousel', style({ transform: 'translateX(-100%)' })),
        query('ngb-carousel',
          stagger('600ms', [
            animate('900ms', style({ transform: 'translateX(0)' }))
          ]))
      ])
    ]),
    trigger('product', [
      transition('* => *', [
        query('ul', style({ transform: 'translateY(100%)' })),
        query('ul',
          stagger('600ms', [
            animate('900ms', style({ transform: 'translateY(0)' }))
          ]))
      ])
    ])
  ]
})
export class ProductDetailsComponent implements OnInit {
  nextProduct: IProduct;
  prevProduct: IProduct;
  product: IProduct;
  images: IImageFile[];
  description: string[];
  care: string[];
  categoryId = 0;

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
        this.categoryId = +params['categoryId'];
        this._productService.getNavigationProduct(id, this.categoryId).subscribe((data: any) => {
          this.prevProduct = data['previous'];
          this.nextProduct = data['next'];
          this.product = data['current'];
          this.images = this.product.images;
          this.description = this.product.description;
          this.care = this.product.care;
        });
      });
  }

  goToNextProduct() {
    this._router.navigate(['/catalog/'+ this.categoryId + '/' + this.nextProduct.productId]);
  }
  goToPrevProduct() {
    this._router.navigate(['/catalog/'+ this.categoryId + '/' + this.prevProduct.productId]);
  }
}