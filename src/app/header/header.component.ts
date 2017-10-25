import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import { AuthenticationService } from '../security/authentication-service.service';
import { HeaderService } from '../shared/header.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLogout: boolean = false;
  inCart: number = 0;
  showLogoutButton: boolean;

  constructor(
  	private router: Router,
    private headerService: HeaderService,
    private auth: AuthenticationService,
    private snackBar: MdSnackBar,
    private http: HttpClient
  ) {
    headerService.showLogInEvent.subscribe(
      (showLogInEvent) => {
        this.showLogoutButton = showLogInEvent;
      }
    );
    headerService.changeInCart.subscribe(
      (inCart) => {
        this.inCart = inCart;
      }
    );
  }

  ngOnInit() {
    let user: string = this.auth.getUsername();
    user !== "" ? this.showLogoutButton = true : this.showLogoutButton = false;
  }

  logout() {
    this.headerService.showLogInEvent.emit(false);
    this.auth.logout();
  }

  login() {
    this.headerService.showLogInEvent.emit(true);
    this.router.navigate(['login']);
  }

  sendReport() {
    this.http.get(environment.API_URL + '/email/report').subscribe();
    this.snackBar.open('Generating report!', '', {
      duration: 2000,
    });
  }

}
