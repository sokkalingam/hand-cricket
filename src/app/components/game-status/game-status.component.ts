import { Component, Input } from '@angular/core';

import { GameStatus } from '../../enum/GameStatus';
import { PlayerType } from '../../enum/PlayerType';

import { Game } from '../../model/Game';

@Component({
  selector: 'game-status',
  templateUrl: './game-status.component.html'
})

export class GameStatusComponent {

  GameStatus = GameStatus;
	PlayerType = PlayerType;

  @Input()
  game: Game;
}
