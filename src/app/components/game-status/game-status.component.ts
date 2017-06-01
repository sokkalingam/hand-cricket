import { Component, Input } from '@angular/core';

@Component({
  selector: 'game-status',
  templateUrl: './game-status.component.html'
})

export class GameStatusComponent {
  @Input()
  gameStatus: number;

  @Input()
  isUserBattingFirst: boolean;
}
