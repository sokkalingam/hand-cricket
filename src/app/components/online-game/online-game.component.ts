import { Component } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'online-game',
  templateUrl: './online-game.component.html'
})

export class OnlineGameComponent {
  url: string = 'http://localhost:8080';
  message: string = '';

  send(): void {
    console.log(this.message);
    this.message = '';
  }
}
