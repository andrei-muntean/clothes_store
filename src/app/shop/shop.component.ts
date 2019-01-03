import { CategoriesService } from './../categories.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from './../models';
import { IProduct } from '../models';
import { ProductsService } from '../products.service';
import { Component, OnInit, Input } from '@angular/core';
import { isNgTemplate } from '../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {

  private _categoryId: number = 0;
  category: ICategory;
  products: IProduct[] = [];
  collectionSize = 10;
  page = 1;

  constructor(private _productService: ProductsService, 
    private _activeRoute: ActivatedRoute,
    private _categoryService: CategoriesService) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(
      params => {
        this._categoryId = +params['categoryId'];
      });
    // de test
    this._categoryService.getCategories().subscribe((data: ICategory[]) => {
      this.category = data.find(item => item.categoryId === this._categoryId);
    });
    // total products
    this._productService.getAll().subscribe((data: IProduct[]) => {
      // number of pages
      this.collectionSize = (data.length / 20) * 10;
    });
    this._productService.getProducts(--this.page, 20, this._categoryId)
      .subscribe(
        (data: IProduct[]) => {
          console.log(data);
          this.products = data;
        }
      );
  }

  pageChange(page): void {
    this._productService.getProducts(--page, 20, this._categoryId)
      .subscribe(
        (data: IProduct[]) => {
          console.log(data);
          this.products = data;
        }
      );
  }
}
