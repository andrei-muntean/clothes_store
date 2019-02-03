import { CategoriesService } from '../categories.service';
import { ICategory, IImageFile, IProducttDefinition, IStock } from '../models';
import { ProductsService } from '../products.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.css']
})
export class ManageproductsComponent implements OnInit {

  products = new Map();
  prodValues: IProduct[] = [];
  categories: ICategory[] = [];
  collectionSize = 10;
  page = 1;

  constructor(private _productService: ProductsService, private _categoryService: CategoriesService) { }

  ngOnInit() {
    // number of products 
    this._productService.getAll().subscribe((data: IProduct[]) => {
      // number of pages
      this.collectionSize = (data.length / 20) * 10;
    });
    // products
    this._productService.getProducts(--this.page, 20)
      .subscribe(
        (data: IProduct[]) => {
          data.forEach(element => {
            this.products.set(element.productId, element);
          });
          this.updateProdValues();
        }
      );
    // categories
    this._categoryService.getCategories()
      .subscribe(
        categories => this.categories = categories
      );
  }

  pageChange(page): void {
    // clear map
    this.products.clear();
    // change page
    this._productService.getProducts(--page, 20)
      .subscribe(
        (data: IProduct[]) => {
          data.forEach(element => {
            this.products.set(element.productId, element);
          });
          this.updateProdValues();
        }
      );
  }

  removeProduct(prodId: number): void {
    this._productService.removeProduct(prodId).subscribe(
      data => {
        if (data[0].status === 200) {
          this.products.delete(prodId);
          this.updateProdValues();
        }
      }
    );
  }

  editProduct(product: IProduct) {
    product.editable = !product.editable;
  }

  saveProduct(product: IProduct, form: NgForm) {
    this._productService.editProduct(product.productId, this.correctModel(product)).subscribe(
      data => {
        // switch state
        product.editable = false
      }
    );
  }
  /**
   * Make sure that the product follows the protocol
   * @param product 
   */
  correctModel(product: IProduct): IProducttDefinition {
    let descr: string[] = [];
    let car: string[] = [];
    return {
      categoryId: product.category.categoryId,
      name: product.name,
      images: [],
      stocks: [],
      price: 0,
      discount: 0,
      isAvailableOnCommand: true,
      isFavourite: product.isFavourite,
      description: descr.concat(product.description),
      care: car.concat(product.care)
    };
  }

  updateProdValues() {
    this.prodValues = Array.from(this.products.values());
  }
}
