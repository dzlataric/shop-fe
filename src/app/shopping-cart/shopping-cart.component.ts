import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MdSnackBar } from '@angular/material';
import { CartItem } from '../types/cart-item';
import { CheckoutItem } from '../types/checkout-item';
import { AuthenticationService } from '../security/authentication-service.service';
import { DataProviderService } from '../data-provider.service';
import { HeaderService } from '../shared/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0;

   private headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.auth.getToken());

  constructor(
    private http: HttpClient,
    private snackBar: MdSnackBar,
    private auth: AuthenticationService,
    private dataProviderService: DataProviderService,
    private headerService: HeaderService,
    private router: Router
  ) { }

  ngOnInit() {
     this.cartItems = this.dataProviderService.getData();
     this.updatePrice();
  }

  updatePrice() {
    for (var i = this.dataProviderService.getData().length - 1; i >= 0; i--) {
      this.total = this.total + (this.dataProviderService.getData()[i].price * this.dataProviderService.getData()[i].amount);
    }
  }

  remove(id) {
    this.dataProviderService.remove(id);
    this.headerService.changeInCart.emit(this.dataProviderService.getData().length);
    this.snackBar.open('Item removed from cart!', '', {
      duration: 2000,
    });
  }

  checkout() {
    this.http.post(environment.API_URL + '/checkout/' + 'admin', this.dataProviderService.checkout(), {
      headers: this.headers
    }).subscribe( );
    this.dataProviderService.removeAll();
    this.headerService.changeInCart.emit(this.dataProviderService.getData().length);
    this.router.navigate(['products']);
    alert(this.dataProviderService.checkout().length);
  }
}
