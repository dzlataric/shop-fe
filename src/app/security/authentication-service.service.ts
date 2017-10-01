import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AuthenticationService {
  
  private authUrl: string = 'http://localhost:8080/auth';
  private headers = new Headers({'Content-Type': 'application/json'});
  private isLoggedIn: boolean;
  private auth: any;

  constructor(private http: HttpClient, private router: Router) { }

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

  logout(): void {
	  // clear token remove user from local storage to log user out
	  localStorage.removeItem('currentUser');
    // redirect to login page
    this.router.navigate(['login']);
  }

  getToken(): string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser && currentUser.token;
    return token ? token : "";
  }

  getUsername(): string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let username = currentUser && currentUser.username;
    return username ? username : "";
  }

  isUserLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

}
