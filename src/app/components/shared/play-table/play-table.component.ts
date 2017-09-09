import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { PlayerStatus } from '../../../enum/PlayerStatus';
import { GameStatus } from '../../../enum/GameStatus';

@Component({
  selector: 'play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./play-table.component.css']
})

export class PlayTableComponent {
  @Input() player: Player;
  @Input() otherPlayer: Player;
  @Input() game: Game;

  PlayerStatus = PlayerStatus;
  GameStatus = GameStatus;
}
