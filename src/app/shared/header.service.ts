import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HeaderService {

  showMenuEvent: EventEmitter<any> = new EventEmitter();
  changeInCart: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

}
