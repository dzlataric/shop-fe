import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { DataProviderService } from '../data-provider.service';
import { AuthenticationServiceService } from '../security/authentication-service.service';
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

  constructor(
    private http: HttpClient,
    private auth: AuthenticationServiceService,
    private router: Router,
    private snackBar: MdSnackBar,
    private dataProviderService: DataProviderService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.http.get<Product[]>(environment.API_URL + this.baseParameters, {
       headers: new HttpHeaders().set('Content-Type', 'application/json')
         .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1MDUwNzI2OTc4OTEsImV4cCI6MTUwNTY3NzQ5NywiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XX0.sbCgQEbMXtYV9p-Yq3c0nxFkMaRpyEb2AeYZcySnFY6Tz6WNtj5sSaE3YhR-d6pO6CjbPFr8sdSUp1TS8RnSdQ')
    }).subscribe(data => {
      this.products = data;
    }, err => {
      //this.router.navigate(['login']);
    });
  }

  onFilter(event: any) {
    this.http.get<Product[]>(environment.API_URL + this.baseParameters + this.search).subscribe(data => {
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

