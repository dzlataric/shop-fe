import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  remove() {
    this.snackBar.open('Not possible to remove item from the cart at the moment!', 'Will be added later.', {
      duration: 2000,
    });
  }

  checkout() {
    this.snackBar.open('Not possible to checkout at the moment!', 'Will be added later.', {
      duration: 2000,
    });
  }
}
