import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  inCart = this.dataProviderService.getData().length;

  constructor(private dataProviderService: DataProviderService) {
  	console.log('In cart: ' + this.inCart);
  }

  ngOnInit() {
  }


}
