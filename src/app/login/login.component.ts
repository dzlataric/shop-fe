import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationServiceService } from '../security/authentication-service.service';
import { HeaderService } from '../shared/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();

  showMenu: boolean = false;

  model: any = {};
  loading = false;
  error = '';

  constructor(
  	private router: Router,
    private auth: AuthenticationServiceService,
    private headerService: HeaderService
  ) { }

  ngOnInit() {
    this.auth.logout();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.headerService.showMenuEvent.emit(this.showMenu);
  }

  login() {
  	this.loading = true;
  	this.auth.login(this.model.username, this.model.password).subscribe(result => {
  		console.log('Result: '+ result);
		if (result === true) {
	        // login successful
	        this.router.navigate(['categories']);
	    } else {
	        // login failed
	        this.error = 'Username or password is incorrect';
	        this.loading = false;
	    }
  	}, err => {
  		this.loading = false;
        this.error = err;
  	})
  }

}
