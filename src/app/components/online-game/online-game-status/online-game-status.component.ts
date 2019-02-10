import { Component, Input } from '@angular/core';

import { GameStatus } from '../../../enum/GameStatus';
import { PlayerType } from '../../../enum/PlayerType';

import { Game } from '../../../model/Game';

import { GameService } from '../../../services/game.service';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'online-game-status',
  templateUrl: './online-game-status.component.html'
})

export class OnlineGameStatusComponent {

  GameStatus = GameStatus;
  PlayerType = PlayerType;

  constructor(public gameService: GameService,
              public playerService: PlayerService) {}

}
