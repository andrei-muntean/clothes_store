import { ProductsService } from './../products.service';
import {  IImageFile, IStock, IProducttDefinition } from './../models';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  model: any = {};
  images: string[] = [];
  submited = false;

  constructor(private _productService: ProductsService) { }

  onFileChanged(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.images.push(reader.result);
      reader.readAsDataURL(file);
    }
  }

  removeImage(image: string): void {
    const indexToDel = this.images.indexOf(image);
    if (indexToDel > -1) {
      this.images.splice(indexToDel, 1);
    }
  }

  getTypeOfEncodedImage(encoded: string) {
    let result = null;
    if (typeof encoded !== 'string') {
      return result;
    }
    let mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1]; // image/:type
    }
    return result.split('/')[1]; // only the type
  }

  onSubmit() {
    this.submited = true;
    // parse model
    // -- images
    let images: IImageFile[] = [];
    this.images.forEach(image => images.push({
      name: this.model.name,
      content: image,
      format: this.getTypeOfEncodedImage(image),
      isBase64Encoded: true
    }))
    // -- stocks
    let stocks: IStock[] = [];
    let sizes: string[] = (<string>this.model.size).split(',')
    sizes.forEach(size => stocks.push({ 
      size: size.replace(/ /g,''), // remove white space
      count: 1 
    }));
    // create product
    let product: IProducttDefinition = {
      categoryId: 0,
      name: this.model.name,
      images: images,
      stocks: stocks,
      price: this.model.price,
      discount: 0,
      isOnPromotion: false,
      promotionImage: null,
      isAvailableOnCommand: true,
      description: (<string>this.model.description).split(','),
      care: (<string>this.model.care).split(',')
    }
    // post to server
    this._productService.addProduct(product).subscribe(responseData => console.log(responseData));;
  }
}
