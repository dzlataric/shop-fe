import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MdSnackBar } from '@angular/material';
import { Category } from '../types/category';
import { DataProviderService } from '../data-provider.service';
import { AuthenticationServiceService } from '../security/authentication-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  search: string;
  baseParameters: string = '/categories?page=1&pageSize=6&search=';

  constructor(
    private http: HttpClient,
    private dataProviderService: DataProviderService,
    private auth: AuthenticationServiceService,
    private snackBar: MdSnackBar
  ) {}

  ngOnInit() {
    this.auth.logout();
    this.auth.login('admin', 'admin');
    this.http.get<Category[]>(environment.API_URL + this.baseParameters, {
       headers: new HttpHeaders().set('Content-Type', 'application/json')
         .set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1MDUwNzI2OTc4OTEsImV4cCI6MTUwNTY3NzQ5NywiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XX0.sbCgQEbMXtYV9p-Yq3c0nxFkMaRpyEb2AeYZcySnFY6Tz6WNtj5sSaE3YhR-d6pO6CjbPFr8sdSUp1TS8RnSdQ')
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