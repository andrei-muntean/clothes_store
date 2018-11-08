import { ProductsService } from './../products.service';
import { ICategory, IImageFile, IStock } from './../models';
import { IProduct } from '../models';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  model: any = {};
  files: File[] = [];
  submited = false;

  constructor(private _productService: ProductsService) { }

  onFileChanged(event) {
    this.files.push(event.target.files[0]);
  }

  onSubmit() {
    this.submited = true;
    // category
    let category: ICategory = {
      categoryId: 0,
      name: this.model.category
    }
    // images
    let images: IImageFile[] = [];
    this.files.forEach(file => {
      images.push({
        name: file.name,
        content: file,
        format: file.type
      });
    });
    // stocks
    let stocks: IStock[] = [];
    (<string>this.model.size).split(',')
    .forEach(s => {
      stocks.push({ 
        size: s, 
        count: 1 
      });
    });
    // description
    let description: string[] = (<string>this.model.description).split(',');
    // care
    let care: string[] = (<string>this.model.care).split(',');
    // product
    let product: IProduct = {
      productId: 0,
      category: category,
      name: this.model.name,
      images: images,
      stocks: stocks,
      discount: this.model.discount,
      isAvailableOnCommand: true,
      description: description,
      care: care,
      price: this.model.price
    }
    // post the product
    this._productService.addProduct(product)
    .subscribe(res => {
      console.log(res);
    })
  }
}
