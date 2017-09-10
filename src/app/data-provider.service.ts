import { Injectable, EventEmitter } from '@angular/core';
import { CartItem } from './types/cart-item';
import { CheckoutItem } from './types/checkout-item';

@Injectable()
export class DataProviderService {

  cartItems: CartItem[] = [];
  checkoutItems: CheckoutItem[] = [];

  constructor() {}

  getData() {
  	return this.cartItems;
  }

  setData(id: number, name: string, category: string, price: number) {
  	if(!this.containsId(id)) {
  		let addItemToCart: CartItem = { productId: id, productName: name, category: category, price: price, amount: 1};
  		this.cartItems.push(addItemToCart);
  		return;
  	}
  	this.cartItems[this.findIndex(id)].amount++;
  }

  remove(id: number) {
  	 this.cartItems.splice(this.findIndex(id), 1);
  }

  checkout(): CheckoutItem[] {
  	for (var i = this.cartItems.length - 1; i >= 0; i--) {
  		let checkoutItem: CheckoutItem = { id: this.cartItems[i].productId, amount: this.cartItems[i].amount };
  		this.checkoutItems.push(checkoutItem);
  	}
  	return this.checkoutItems;
  }

  containsId(id: number): boolean {
  	for (let i = this.cartItems.length - 1; i >= 0; i--) {
  		if(this.cartItems[i].productId == id) {
  			return true;
  		}
  	}
  	return false;
  }

  findIndex(id: number): number {
  	for (let i = this.cartItems.length - 1; i >= 0; i--) {
  		if(this.cartItems[i].productId == id) {
  			return i;
  		}
  	}
  }

}
