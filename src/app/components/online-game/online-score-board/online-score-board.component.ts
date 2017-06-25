import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';

import { PlayerService } from '../../../services/player.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'online-score-board',
  templateUrl: './online-score-board.component.html'
})

export class OnlineScoreBoardComponent {

  constructor(private playerService: PlayerService,
              private gameService: GameService) {}

  showCurrentPlayerScore(): boolean {
    return this.playerService.isBatsman() ||
      this.playerService.isCurrentPlayerOut() ||
      this.gameService.isGameOver() || this.gameService.isGameDraw();
  }

  showOtherPlayerScore(): boolean {
    return this.playerService.isBowler() ||
      this.playerService.isOtherPlayerOut() ||
      this.gameService.isGameOver() || this.gameService.isGameDraw();
  }

}
