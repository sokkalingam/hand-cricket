import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../../model/Player';
import { Game } from '../../model/Game';
import { Message } from '../../model/Message';
import { PlayerType } from '../../enum/PlayerType';

import { SocketService } from '../../services/socket.service';
import { GameService } from '../../services/game.service';
import { GameSequenceService } from '../../services/game-sequence.service';

@Component({
  selector: 'online-game',
  templateUrl: './online-game.component.html',
  providers: [GameSequenceService]
})

export class OnlineGameComponent implements OnInit {
  player: Player;
  JSON = JSON;

  constructor(private socketService: SocketService,
              private gameService: GameService,
              private gameSequenceService: GameSequenceService) {
    this.player = new Player(PlayerType.User);
  }

  ngOnInit(): void {
    this.connect();
  }

  connect(): void {
    this.socketService.connect();
  }

  disconnect(): void {
    this.socketService.disconnect();
  }

  isOnline(): boolean { return this.socketService.isConnected(); }

  isGameConnected(): boolean { return this.gameService.isConnected(this.gameService.getGame()); }

}
