import { IProduct } from '../models';
import { CategoriesService } from './categories.service';
import { ProductsService } from '../products.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  selectedCategory: string;
  categories: string[];
  allProducts: IProduct[];
  products: IProduct[] = [];

  constructor(productService: ProductsService, categoryService: CategoriesService) {
    // categories
    this.categories = categoryService.getAll();
    this.selectedCategory = this.categories[0];
    // producrs
    productService.getAll().subscribe((data: IProduct[]) => {
      console.log(data);
      this.products = data;
      this.allProducts = data;
    });
  }

  filterProducts(category: string) {
    // set selected category
    this.selectedCategory = category;
    // filter products
    if(category === 'All') {
      this.products = this.allProducts;
      return;
    }
    this.products = this.allProducts.filter((product: IProduct) => 
      product.category.name.toLowerCase() === category.toLowerCase()
    );
  }
}
