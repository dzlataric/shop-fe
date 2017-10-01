import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { DataProviderService } from '../data-provider.service';
import { AuthenticationService } from '../security/authentication-service.service';
import { HeaderService } from '../shared/header.service';
import { Product } from '../types/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  search: string;
  baseParameters: string = '/products?page=1&pageSize=6&search=';
  inCart: Product[];	
  username: string;

  private headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.auth.getToken());

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: MdSnackBar,
    private dataProviderService: DataProviderService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.http.get<Product[]>(environment.API_URL + this.baseParameters, {
       headers: this.headers
    }).subscribe(data => {
      this.products = data;
      this.username = this.auth.getUsername();
    }, err => {
      this.router.navigate(['login']);
    });
  }

  onFilter(event: any) {
    this.http.get<Product[]>(environment.API_URL + this.baseParameters + this.search, {
       headers: this.headers
    }).subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product) {
    this.dataProviderService.setData(product.id, product.name, product.category, product.price);
    this.headerService.changeInCart.emit(this.dataProviderService.getData().length);
    this.snackBar.open('Added to cart: ' + product.name, 'Price: ' + product.price + '€', {
      duration: 2000,
    });
  }
  getDetails(id: number) {
    this.router.navigate(['/details/' + id]); 
    this.snackBar.open('Product detais are not available at the moment!', 'ID: ' + id, {
      duration: 2000,
    });
  }

  addNew() {
    this.snackBar.open('Not possible to add new product at the moment!', 'Will be added later.', {
      duration: 2000,
    });
  }

  remove() {
    this.snackBar.open('Not possible to remove product at the moment!', 'Will be added later.', {
      duration: 2000,
    });
  }

}

