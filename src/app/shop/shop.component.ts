import { IProduct } from '../models';
import { ProductsService } from '../products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {

  selectedCategory: string;
  categories: string[];
  products: IProduct[] = [];
  collectionSize = 10;
  page = 1;

  constructor(private _productService: ProductsService) {
    // total products
    this._productService.getAll().subscribe((data: IProduct[]) => {
      // number of pages
      this.collectionSize = (data.length / 20) * 10;
    });
  }

  ngOnInit(): void {
    this._productService.getProducts(--this.page, 20, 1)
      .subscribe(
        (data: IProduct[]) => {
          console.log(data);
          this.products = data;
        }
      );
  }

  pageChange(page): void {
    this._productService.getProducts(--page, 20, 1)
      .subscribe(
        (data: IProduct[]) => {
          console.log(data);
          this.products = data;
        }
      );
  }
}
