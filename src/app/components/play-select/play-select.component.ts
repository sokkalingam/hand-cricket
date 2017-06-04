import { Component, Input } from '@angular/core';

import { Update } from '../../model/Update';
import { Player } from '../../model/Player';
import { Game } from '../../model/Game';

import { UpdateType } from '../../enum/UpdateType';
import { PlayerType } from '../../enum/PlayerType';
import { PlayerStatus } from '../../enum/PlayerStatus';
import { GameStatus } from '../../enum/GameStatus';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'play-select',
  templateUrl: './play-select.component.html',
  providers: [GameService]
})

export class PlaySelectComponent {

  @Input() user: Player;
  @Input() computer: Player;
  @Input() game: Game;

  GameStatus = GameStatus;

  constructor(private gameService: GameService) {}

  setGameStatus(gameStatus: GameStatus): void {
    this.game.gameStatus = gameStatus;
  }

  choseToBat(): void {
    this.gameService.setPlayersAndGame(this.game, this.user, this.computer);
  }

  choseToBowl(): void {
    this.gameService.setPlayersAndGame(this.game, this.computer, this.user);
  }

  toss(): void {
    if (Math.random() < 0.5)
      this.choseToBat();
    else
      this.choseToBowl();
  }

}
