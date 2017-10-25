import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MdButtonModule, MdIconModule, MdSnackBarModule} from '@angular/material';

import { DataProviderService } from './data-provider.service';
import { AuthenticationService } from './security/authentication-service.service';
import { AuthGuardService } from './security/auth-guard.service';
import { HeaderService } from './shared/header.service';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    ShoppingCartComponent,
    AboutComponent,
    ContactComponent,
    ProductDetailsComponent,
    LoginComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdIconModule,
    MdSnackBarModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'about', component: AboutComponent
      },
      {
        path: 'contact', component: ContactComponent
      },
      {
        path: 'categories', component: CategoryComponent
      },
      {
        path: 'products', component: ProductComponent/*, canActivate: [AuthGuardService]*/
      },
      {
        path: 'cart', component: ShoppingCartComponent
      },
      {
        path: 'details/:id', component: ProductDetailsComponent
      },
      {
        path: 'new', component: NewProductComponent
      }
    ])
  ],
  providers: [AuthenticationService, AuthGuardService, DataProviderService, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
