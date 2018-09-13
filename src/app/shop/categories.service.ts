import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories: string[];

  constructor() { }

  getAll(): string[] {
    return ['All', 'Tops', 'Bottoms', 'Full Pieces', 'Body Suits', 'Accessories', 'On Sale'];
  }
}
