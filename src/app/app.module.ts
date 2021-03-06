import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ProductCardComponent } from './shop/product-card/product-card.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { FooterComponent } from './footer/footer.component';
import { HomeNewComponent } from './home/home-new/home-new.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ShareButtonModule } from '@ngx-share/button';
import 'hammerjs';

/* here we define routes */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog/:categoryId', component: ShopComponent },
  { path: 'catalog/:categoryId/:id', component: ProductDetailsComponent },
  { path: 'manageProducts/addproducts', component: AddProductsComponent },
  { path: 'manageProducts', component: ManageproductsComponent },
  { path: 'aboutMe', component: AboutMeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NavbarComponent,
    ShopComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    AddProductsComponent,
    FooterComponent,
    HomeNewComponent,
    AboutMeComponent,
    ManageproductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    Ng2ImgMaxModule,
    ShareButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
