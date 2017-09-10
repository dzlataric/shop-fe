import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
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

  constructor(
  	private router: Router,
    private headerService: HeaderService
  ) {
    headerService.showMenuEvent.subscribe(
      (showMenu) => {
        this.showLogout = !this.showLogout;
      }
    );
    headerService.changeInCart.subscribe(
      (inCart) => {
        this.inCart = inCart;
      }
    );
  }


  ngOnInit() {
  }

  logout() {
  	this.router.navigate(['login']);
  }

}
