import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ProductCardComponent } from './shop/product-card/product-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { SizingComponent } from './sizing/sizing.component';
import { VideosComponent } from './videos/videos.component';
import { ShopComponent } from './shop/shop.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProcessOrderComponent } from './process-order/process-order.component';
import { ProcessPaymentComponent } from './process-payment/process-payment.component';
import { FooterComponent } from './footer/footer.component';

/* here we define routs */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: ShopComponent },
  { path: 'catalog/:id', component: ProductDetailsComponent },
  { path: 'video', component: VideosComponent },
  { path: 'sizing', component: SizingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'account', component: AccountComponent },
  { path: 'shopingcart', component: ShoppingCartComponent},
  { path: 'processorder', component: ProcessOrderComponent},
  { path: 'processpayment', component: ProcessPaymentComponent},
  { path: 'addproducts', component: AddProductsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NavbarComponent,
    ShopComponent,
    VideosComponent,
    SizingComponent,
    ContactComponent,
    AccountComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    AddProductsComponent,
    ShoppingCartComponent,
    ProcessOrderComponent,
    ProcessPaymentComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes, {enableTracing: true} /* debug purposes */
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
