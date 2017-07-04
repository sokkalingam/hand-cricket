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
    this.socketService.ping();
    this.socketService.subscribeToHighlight();
    this.socketService.subscribeToNotice();
    this.socketService.subscribeToWait();
    this.socketService.subscribeToResult();
    this.socketService.subscribetoPing();
  }

  isBatsman(): boolean {
    return this.playerService.isBatsman();
  }

  isBowler(): boolean {
    return this.playerService.isBowler();
  }

  getCurrentPlayer(): Player {
    return this.playerService.getCurrentPlayer();
  }

  getOtherPlayer(): Player {
    return this.playerService.getOtherPlayer();
  }

  playEnabled(): boolean {
    return !this.playService.wait && this.input >= 0 && this.input <= 6;
  }

  sendInput(): void {
    if (!this.playEnabled()) return;
    this.socketService.sendInput(this.input);
    this.clearInputAndUpdates();
  }

  restartGame(): void {
    this.clearInputAndUpdates();
    this.gameService.restartGame().subscribe(
      (text: string) => {
        console.log(text);
      },
      (error) => console.log(error)
    );
  }

  clearInputAndUpdates(): void {
    this.input = undefined;
    this.playService.notice = undefined;
    this.playService.hightlight = undefined;
  }

}
