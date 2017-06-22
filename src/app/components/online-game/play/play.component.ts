import { Component, Input } from '@angular/core';

import { Game } from '../../../model/Game';
import { Player } from '../../../model/Player';

import { SocketService } from '../../../services/socket.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'play',
  templateUrl: './play.component.html'
})

export class PlayComponent {

  @Input() game: Game;
  @Input() player: Player;
  notice: string;
  input: number;
  gameConnected: boolean;

  constructor(private socketService: SocketService,
              private gameService: GameService) { }

  isBatsman(): boolean {
    return this.game.batsman.id == this.player.id;
  }

  isBowler(): boolean {
    return this.game.bowler.id == this.player.id;
  }

  sendInput(): void {
    this.socketService.sendInput(this.game.id, this.player.id, this.input);
  }

}
