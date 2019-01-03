import { CategoriesService } from './../../categories.service';
import { ICategory } from '../../models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // cartQty: number;
  categories: ICategory[] = [];

  constructor(private categoryService: CategoriesService) {
    // load categories
    categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    })
  }

  ngOnInit() {
    // this._productService.productsNrObs.subscribe( newCartQty => this.cartQty = newCartQty);
    // this._productService.productsObs.subscribe( newProducts => this.products = newProducts);
  }
}
