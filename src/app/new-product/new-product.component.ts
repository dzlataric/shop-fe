import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  product: Product;	

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  	alert(this.product);
  }

}
