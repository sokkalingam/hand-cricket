import { Component, OnInit } from '@angular/core';

import { Player } from '../../model/Player';
import { Game } from '../../model/Game';

import { PlayerType } from '../../enum/PlayerType';
import { PlayerStatus } from '../../enum/PlayerStatus';
import { GameStatus } from '../../enum/GameStatus';

@Component({
  selector: 'offline-game',
  templateUrl: './offline-game.component.html'
})

export class OfflineGameComponent implements OnInit {

  /**
  * Init Enums
  */
  PlayerStatus = PlayerStatus;
  PlayerType = PlayerType;
  GameStatus = GameStatus;

  user: Player;
  computer: Player;
  game: Game;

  ngOnInit(): void {
    this.user = new Player(PlayerType.User);
    this.computer = new Player(PlayerType.Computer);
    this.game = new Game();
  }

}
