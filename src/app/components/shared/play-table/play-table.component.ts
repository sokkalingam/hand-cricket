import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { PlayerStatus } from '../../../enum/PlayerStatus';
import { GameStatus } from '../../../enum/GameStatus';

import { GameAnimation } from '../../../animations/GameAnimation';
import { PlaySelectAnimation } from '../../../animations/PlaySelectAnimation';

@Component({
  selector: 'play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./play-table.component.css',
              '../../../shared/css/price_table.css'],
  animations: [GameAnimation, PlaySelectAnimation]
})

export class PlayTableComponent {
  @Input() player: Player;
  @Input() otherPlayer: Player;
  @Input() game: Game;
  @Input() notice: string;
  @Input() playerNotice: string;

  PlayerStatus = PlayerStatus;
  GameStatus = GameStatus;

  JSON = JSON;

  isGameInProgress(): boolean {
    return this.game.gameStatus == GameStatus.IN_PROGRESS
      || this.game.gameStatus.toString() == GameStatus[GameStatus.IN_PROGRESS];
  }

  isGameDraw(): boolean {
    return this.game.gameStatus == GameStatus.DRAW
      || this.game.gameStatus.toString() == GameStatus[GameStatus.DRAW];
  }

  isPlayerWon(): boolean {
    return this.player.status == PlayerStatus.Won
      || this.player.status.toString() == PlayerStatus[PlayerStatus.Won];
  }

  isPlayerLost(): boolean {
    return this.player.status == PlayerStatus.Lost
      || this.player.status.toString() == PlayerStatus[PlayerStatus.Lost];
  }

  isPlayerOut(): boolean {
    return this.player.status == PlayerStatus.Out
      || this.player.status.toString() == PlayerStatus[PlayerStatus.Out];
  }
}
