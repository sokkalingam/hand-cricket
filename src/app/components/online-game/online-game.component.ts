import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../../model/Player';
import { Game } from '../../model/Game';
import { PlayerType } from '../../enum/PlayerType';

import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'online-game',
  templateUrl: './online-game.component.html',
  providers: [SocketService]
})

export class OnlineGameComponent implements OnInit {
  connection: boolean;
  player: Player;
  game: Game;
  name: string = '';
  messages: string[] = [];

  constructor(private socketService: SocketService) {
    this.player = new Player(PlayerType.User);
    this.game = new Game();
  }

  ngOnInit(): void {
    this.player = new Player(PlayerType.User);
    this.connect();
  }

  connect(): void {
    this.socketService.connect(this.player, this.messages);
  }

  disconnect(): void {
    this.socketService.disconnect(this.player);
  }

  send(): void { this.socketService.send(this.player, this.name); }

}
