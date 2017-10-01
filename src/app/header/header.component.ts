import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import { AuthenticationService } from '../security/authentication-service.service';
import { HeaderService } from '../shared/header.service';
import { Router } from '@angular/router';

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
    private auth: AuthenticationService
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
    this.router.navigate(['login']);
  }

}
