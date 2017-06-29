import { Component, Input } from '@angular/core';

import { Game } from '../../../model/Game';
import { Player } from '../../../model/Player';

import { SocketService } from '../../../services/socket.service';
import { GameService } from '../../../services/game.service';
import { PlayService } from '../../../services/play.service';

@Component({
  selector: 'play',
  templateUrl: './play.component.html'
})

export class PlayComponent {

  @Input() player: Player;
  game: Game;
  input: number;
  gameConnected: boolean = false;

  JSON = JSON;

  constructor(private socketService: SocketService,
              private gameService: GameService,
              private playService: PlayService) {
    this.game = gameService.getGame();
  }

  isBatsman(): boolean {
    return this.game.batsman.id == this.player.id;
  }

  isBowler(): boolean {
    return this.game.bowler.id == this.player.id;
  }

  connectGame(): void {
    this.socketService.subscribeToNotice(this.game.id, this.player.id);
    this.gameConnected = true;
  }

  disconnectGame(): void {
    this.gameConnected = false;
  }

  sendInput(): void {
    if (this.input >= 0 && this.input <= 6)
      this.socketService.sendInput(this.game.id, this.player.id, this.input);
  }

}
