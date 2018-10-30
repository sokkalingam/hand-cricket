import { Component, Input, OnInit } from '@angular/core';

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

export class PlayTableComponent implements OnInit {
  @Input() player: Player;
  @Input() otherPlayer: Player;
  @Input() game: Game;
  @Input() notice: string;
  @Input() playerNotice: string;

  PlayerStatus = PlayerStatus;
  GameStatus = GameStatus;

  JSON = JSON;

  constructor() {
    console.log('constructor', this.player, this.otherPlayer, this.game, this.notice, this.playerNotice);
  }

  ngOnInit(): void {
    console.log('oninit', this.player, this.otherPlayer, this.game, this.notice, this.playerNotice);
  }

  gameInProgress(): boolean {
    return this.game.gameStatus == GameStatus.IN_PROGRESS
      || this.game.gameStatus.toString() == GameStatus[GameStatus.IN_PROGRESS];
  }
}
