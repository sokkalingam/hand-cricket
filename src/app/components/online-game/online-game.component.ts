import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Player } from '../../model/Player';
import { Game } from '../../model/Game';
import { Message } from '../../model/Message';
import { PlayerType } from '../../enum/PlayerType';

import { SocketService } from '../../services/socket.service';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { CountdownService } from '../../services/countdown.service';

@Component({
  selector: 'online-game',
  templateUrl: './online-game.component.html'
})

export class OnlineGameComponent implements OnInit, OnDestroy {

  constructor(private socketService: SocketService,
              private gameService: GameService,
              private playerService: PlayerService,
              private countdownService: CountdownService) {
    playerService.setPlayer(new Player(PlayerType.User));
  }

  ngOnInit(): void {
    this.connect();
    this.countdownService.countdown();
  }

  ngOnDestroy(): void {
    this.socketService.quitGame();
    this.socketService.disconnect();
    this.gameService.resetGame();
  }

  connect(): void {
    this.socketService.connect();
  }

  disconnect(): void {
    this.socketService.disconnect();
  }

  isOnline(): boolean { return this.socketService.isConnected(); }

  isGameConnected(): boolean {
    return this.gameService.isConnected();
  }

}
