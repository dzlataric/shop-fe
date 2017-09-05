import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  submit() {
  	this.snackBar.open('Not possible to submit form at the moment!', 'Will be added later.', {
      duration: 2000,
    });
  }
}
