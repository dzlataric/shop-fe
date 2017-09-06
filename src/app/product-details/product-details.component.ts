import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDetails } from '../types/product-details';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  details: ProductDetails;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
  	this.http.get<ProductDetails>(environment.API_URL + '/products/' +this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.details = data;
    });
  }

}
