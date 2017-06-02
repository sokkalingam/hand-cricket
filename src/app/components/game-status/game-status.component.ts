import { Component, Input } from '@angular/core';

import { GameStatus } from '../../enum/GameStatus';
import { Player } from '../../model/Player';

@Component({
  selector: 'game-status',
  templateUrl: './game-status.component.html'
})

export class GameStatusComponent {

  GameStatus = GameStatus;

  @Input()
  gameStatus: GameStatus;

  @Input()
  user: Player;
}
