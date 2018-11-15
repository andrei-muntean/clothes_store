import { CategoriesService } from './../shop/categories.service';
import { ProductsService } from './../products.service';
import { IImageFile, IStock, IProducttDefinition, ICategory } from './../models';
import { Component } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  model: any = {};
  categories: ICategory[] = [];
  images: IImageFile[] = [];
  lastImageName: string = 'Choose Images For This Product';
  isPromotionImage: boolean = false;
  promoImage: IImageFile;
  promoImageText: string = 'Choose Promotion Image For This Product';
  submited = false;

  constructor(private _productService: ProductsService, categoryService: CategoriesService) {
    categoryService.getAll().subscribe(c => { 
      this.categories = c;
    });
  }

  changeIsPromotionImage() {
    this.isPromotionImage = !this.isPromotionImage;
  }

  onFileChanged(event): void {
    if (event.target.files && event.target.files[0]) {
      // image to laod
      let image: IImageFile = {};
      const file = event.target.files[0];
      image.name = file.name;
      image.format = file.type.split('/')[1];
      image.isBase64Encoded = true;
      const reader = new FileReader();
      reader.onload = e => {
        image.content = reader.result;
        this.images.push(image);
      }
      reader.readAsDataURL(file);
      // update file uploader text
      this.lastImageName = image.name;
    }
  }

  removeImage(image: IImageFile): void {
    const indexToDel = this.images.indexOf(image);
    if (indexToDel > -1) {
      this.images.splice(indexToDel, 1);
    }
  }

  onPromoFileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      // image to laod
      let image: IImageFile = {};
      const file = event.target.files[0];
      image.name = file.name;
      image.format = file.type.split('/')[1];
      image.isBase64Encoded = true;
      const reader = new FileReader();
      reader.onload = e => {
        image.content = reader.result;
        this.promoImage = image;
      }
      // update promo file chooser
      this.promoImageText = image.name;
      // read as url
      reader.readAsDataURL(file);
    }
  }

  removePromoImage() {
    this.promoImage = undefined
  }

  getBase64(text: string): string {
    return text.split(',')[1];
  }

  /**
   * Parse the base64 string of an image to get its type
   * @param encoded - base64 string of an image
   */
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

  onSubmit(f: NgForm) {
    this.submited = true;
    // parse model
    // -- stocks
    let stocks: IStock[] = [];
    let sizes: string[] = (<string>this.model.size).split(',')
    sizes.forEach(size => stocks.push({
      size: size.replace(/ /g, ''), // remove white space
      count: 1
    }));
    // -- images
    this.images.forEach(image => image.content = this.getBase64(image.content))
    if (this.promoImage) {
      this.promoImage.content = this.getBase64(this.promoImage.content);
    }
    // create product
    let product: IProducttDefinition = {
      categoryId: this.model.category.categoryId,
      name: this.model.name,
      images: this.images,
      stocks: stocks,
      price: this.model.price,
      discount: this.model.discount,
      isOnPromotion: this.isPromotionImage,
      promotionImage: this.isPromotionImage ? this.promoImage : null,
      isAvailableOnCommand: true,
      description: (<string>this.model.description).split(','),
      care: (<string>this.model.care).split(',')
    }
    // post to server
    this._productService.addProduct(product).subscribe(responseData => {
      console.log(responseData);
    });
    // clear page
    this.images.splice(0, this.images.length);
    this.lastImageName = '';
    this.promoImage = null;
    this.promoImageText = '';
    this.isPromotionImage = false;
    f.resetForm();
  }
}
