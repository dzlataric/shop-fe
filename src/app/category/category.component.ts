import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MdSnackBar } from '@angular/material';
import { Category } from '../types/category';
import { DataProviderService } from '../data-provider.service';
import { AuthenticationService } from '../security/authentication-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  search: string;
  baseParameters: string = '/categories?page=1&pageSize=6&search=';

  private headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.auth.getToken());

  constructor(
    private http: HttpClient,
    private dataProviderService: DataProviderService,
    private auth: AuthenticationService,
    private snackBar: MdSnackBar
  ) {}

  ngOnInit() {
    this.http.get<Category[]>(environment.API_URL + this.baseParameters, {
       headers: this.headers
    }).subscribe(data => {
      this.categories = data;
    });
  }

  onFilter(event: any) {
    this.http.get<Category[]>(environment.API_URL + this.baseParameters + this.search).subscribe(data => {
      this.categories = data;
    });
  }

  onSelect(category: Category) {
     this.snackBar.open('TITLE: ' + category.title, 'DESCRIPTION: ' + category.description, {
      duration: 2000,
    });
  }
}