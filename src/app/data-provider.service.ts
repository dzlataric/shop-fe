import { Injectable } from '@angular/core';

@Injectable()
export class DataProviderService {

  data = 'DEJAN-STRING';
  cartItems: string[];

  constructor() {
  	this.cartItems = ['Deki'];
  }

  getData() {
  	return this.cartItems;
  }

  setData(newData: string) {
  	this.cartItems.push(newData);
  	console.log(this.cartItems);
  }

}
