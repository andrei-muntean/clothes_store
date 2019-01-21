import { IImageFile } from './../../models';
import { IProduct } from '../../models';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: IProduct;

  _image: string = '';

  get image() {
    if (this.product && this.product.images) {
      let imageFile: IImageFile = this.product.images.find(element => element.hasThumbnail === true);
      let contentSplit = imageFile.content.split('.');
      contentSplit.forEach((content, index) => {
        if(index == contentSplit.length - 1) {
          this._image = this._image.concat('_thumbnail.', content);
        } else {
          this._image = this._image.concat(content);
        }
      })
      console.log(this._image);
    }
    return this._image;
  }

  constructor() { }

}
