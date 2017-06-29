import { Component } from '@angular/core';

import { Player } from '../../model/Player';
import { Game } from '../../model/Game';

import { PlayerType } from '../../enum/PlayerType';
import { PlayerStatus } from '../../enum/PlayerStatus';
import { GameStatus } from '../../enum/GameStatus';

@Component({
  selector: 'offline-game',
  templateUrl: './offline-game.component.html'
})

export class OfflineGameComponent {

  /**
  * Init Enums
  */
  PlayerStatus = PlayerStatus;
  PlayerType = PlayerType;
  GameStatus = GameStatus;

  userInput: number;

  user: Player = new Player(PlayerType.User);
  computer: Player = new Player(PlayerType.Computer);

  game: Game = new Game();

}
