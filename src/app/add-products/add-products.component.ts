import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { IImageFile, IStock, IProducttDefinition, ICategory } from '../models';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';

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
  submited = false;
  isLoading = false;

  constructor(private _productService: ProductsService,
    categoryService: CategoriesService,
    private ng2ImgMaxService: Ng2ImgMaxService) {
    categoryService.getCategories().subscribe(c => {
      this.categories = c;
    });
  }

  onFileChanged(event): void {
    if (event.target.files && event.target.files[0]) {
      // image to laod
      let image: IImageFile = {};
      const file = event.target.files[0];
      // start loading
      this.isLoading = true;
      // crompress file
      this.ng2ImgMaxService.compressImage(file, 0.5).subscribe(result => {
        // stop loading
        this.isLoading = false;
        // set image
        image.name = result.name;
        image.format = result.type.split('/')[1];
        image.isBase64Encoded = true;
        image.hasThumbnail = true;
        const reader = new FileReader();
        reader.onload = e => {
          image.content = reader.result;
          this.images.push(image);
        }
        reader.readAsDataURL(result);
        // update file uploader text
        this.lastImageName = image.name;
      })
    }
  }

  removeImage(image: IImageFile): void {
    const indexToDel = this.images.indexOf(image);
    if (indexToDel > -1) {
      this.images.splice(indexToDel, 1);
    }
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
    this.isLoading = true;
    this.submited = true;
    // parse model
    // -- images
    this.images.forEach(image => image.content = this.getBase64(image.content));
    // -- description
    let descr = this.model.description;
    // -- care
    let care = this.model.care;
    // create product
    let product: IProducttDefinition = {
      categoryId: this.model.category.categoryId,
      name: this.model.name,
      images: this.images,
      stocks: [],
      discount: 0,
      price: 0,
      isAvailableOnCommand: true,
      isFavourite: this.model.isFavourite ? this.model.isFavourite : false,
      description: descr ? (<string>descr).split(',') : [],
      care: care ? (<string>care).split(',') : []
    }
    // post to server
    this._productService.addProduct(product).subscribe(responseData => {
      if (responseData[0].status === 200) {
        this.isLoading = false;
      }
      this.isLoading = false;
      this.clearForm(f);
      // display succesful or error
    }, err => {
      this.isLoading = false;
      this.clearForm(f);
    });
  }

  clearForm(f: NgForm) {
    // clear page
    this.images.splice(0, this.images.length);
    this.images = [];
    this.lastImageName = '';
    f.resetForm();
  }
}
