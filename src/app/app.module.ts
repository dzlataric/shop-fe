  import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DataTableModule,SharedModule} from 'primeng/primeng';

import {MdTableModule, MdButtonModule, MdIconModule, MdSnackBarModule} from '@angular/material';

import { DataProviderService } from './data-provider.service';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    ShoppingCartComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdTableModule,
    MdButtonModule,
    MdIconModule,
    MdSnackBarModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    RouterModule.forRoot([
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
        path: 'products', component: ProductComponent
      },
      {
        path: 'cart', component: ShoppingCartComponent
      }
    ])
  ],
  providers: [DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
