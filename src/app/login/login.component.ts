import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../security/authentication-service.service';
import { HeaderService } from '../shared/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loggedIn: boolean = false;

  model: any = {};
  loading = false;
  error = '';

  constructor(
  	private router: Router,
    private auth: AuthenticationService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.auth.logout();
  }

  toggleMenu(isLoggedIn: boolean) {
    this.loggedIn = isLoggedIn;
    this.headerService.showLogInEvent.emit(this.loggedIn);
  }

  login() {
  	this.loading = true;
  	this.headerService.showLogInEvent.emit(true);
    this.router.navigate(['products']);
    /*this.auth.login(this.model.username, this.model.password).subscribe(result => {
		if (result === true) {
	        // login successful
          this.headerService.showLogInEvent.emit(true);
	        this.router.navigate(['/']);
	    } else {
	        // login failed
	        this.error = 'Username or password is incorrect';
	        this.loading = false;
	    }
  	}, err => {
  		this.loading = false;
        this.error = err;
  	})*/
  }

}
