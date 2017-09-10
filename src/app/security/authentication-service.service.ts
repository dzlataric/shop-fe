import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationServiceService {
  
  private authUrl: string = 'http://localhost:8080/auth';
  private headers = new Headers({'Content-Type': 'application/json'});
  private isLoggedIn: boolean;
  private auth: any;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).subscribe(data => {
      this.auth = data;
      localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.auth.token }));
      this.isLoggedIn =  true;
    }, err => {
      this.isLoggedIn =  false;
    });
    return Observable.of(this.isLoggedIn);
   }

  getToken(): string {
  	let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	let token = currentUser && currentUser.token;
  	return token ? token : "";
  }

  logout(): void {
	  // clear token remove user from local storage to log user out
	  localStorage.removeItem('currentUser');
  }

}
