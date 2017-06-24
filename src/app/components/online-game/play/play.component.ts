import { Component, Input } from '@angular/core';

import { Game } from '../../../model/Game';
import { Player } from '../../../model/Player';

import { SocketService } from '../../../services/socket.service';
import { GameService } from '../../../services/game.service';
import { PlayService } from '../../../services/play.service';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'play',
  templateUrl: './play.component.html'
})

export class PlayComponent {

  player: Player;
  game: Game;
  input: number;
  gameConnected: boolean = false;

  JSON = JSON;

  constructor(private socketService: SocketService,
              private gameService: GameService,
              private playService: PlayService,
              private playerService: PlayerService) {
    this.game = gameService.getGame();
    this.player = playerService.getPlayer();
    this.socketService.subscribeToNotice(this.game.id, this.player.id);
    this.socketService.subscribeToWait(this.game.id, this.player.id);
    this.socketService.subscribeToResult(this.game.id, this.player.id);
  }

  isBatsman(): boolean {
    return this.playerService.isBatsman(this.gameService.getGame());
  }

  isBowler(): boolean {
    return this.playerService.isBowler(this.gameService.getGame());
  }

  getCurrentPlayer(): Player {
    return this.playerService.getCurrentPlayer(this.gameService.getGame());
  }

  getOtherPlayer(): Player {
    return this.playerService.getOtherPlayer(this.gameService.getGame());
  }

  playEnabled(): boolean {
    return !this.playService.wait && this.input >= 0 && this.input <= 6;
  }

  sendInput(): void {
    if (!this.playEnabled()) return;
    this.socketService.sendInput(this.game.id, this.player.id, this.input);
    this.input = undefined;
    this.playService.notice = '';
  }

}
