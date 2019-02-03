import { IImageFile } from '../../models';
import { ProductsService } from '../../products.service';
import { IProduct } from '../../models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import { Meta } from '@angular/platform-browser';
import * as kf from '../../../animations'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [
    trigger('carouselAnimator', [
      transition('* => fadeInLeft', animate(2000, keyframes(kf.fadeInLeft))),
      transition('* => fadeOutLeft', animate(2000, keyframes(kf.fadeOutLeft))),
      transition('* => fadeInRight', animate(2000, keyframes(kf.fadeInRight))),
      transition('* => fadeOutRight', animate(2000, keyframes(kf.fadeOutRight)))
    ])
  ]
})
export class ProductDetailsComponent implements OnInit {
  // animation
  animationState: string;
  // product
  nextProduct: IProduct;
  prevProduct: IProduct;
  product: IProduct;
  images: IImageFile[];
  description: string[];
  care: string[];
  categoryId = 0;
  // social buttons inputs
  url = '';
  text = '';
  media = '';

  constructor(
    private _productService: ProductsService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _meta: Meta,
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
          // social buttons
          this.url = 'https://ancamorar.com' + this._router.url;
          this.media = 'https://s3.us-east-2.amazonaws.com/' + this.images[0].content;
          this.text = this.product.name;
          // adding meta tags
          this.createFacebookMeta();
          this.createTwitterMeta();
        });
      });
  }

  startAnimationState(state): void {
    console.log(state);
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(): void {
    this.animationState = '';
  }

  goToNextProduct(): void {
    this._router.navigate(['/catalog/' + this.categoryId + '/' + this.nextProduct.productId]);
    this.startAnimationState('fadeInRight');
  }
  goToPrevProduct(): void {
    this._router.navigate(['/catalog/' + this.categoryId + '/' + this.prevProduct.productId]);
    this.startAnimationState('fadeInLeft');
  }

  createFacebookMeta(): void {
    this._meta.updateTag({ property: 'og:url', content: this.url }, `property='og:url'`);
    this._meta.updateTag({ property: 'og:image', content: this.url }, `property='og:image'`);
    this._meta.updateTag({ property: 'og:title', content: this.url }, `property='og:title'`);
  }

  createTwitterMeta(): void {
    this._meta.updateTag({ property: 'twitter:domain', content: this.url }, `name='twitter:domain'`);
    this._meta.updateTag({ property: 'twitter:image', content: this.url }, `name='twitter:image'`);
    this._meta.updateTag({ property: 'twitter:title', content: this.url }, `name='twitter:title'`);
  }
}