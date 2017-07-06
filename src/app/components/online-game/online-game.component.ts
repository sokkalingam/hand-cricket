import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../../model/Player';
import { Game } from '../../model/Game';
import { Message } from '../../model/Message';
import { PlayerType } from '../../enum/PlayerType';

import { SocketService } from '../../services/socket.service';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'online-game',
  templateUrl: './online-game.component.html'
})

export class OnlineGameComponent implements OnInit {

  secondsCounter: number;

  constructor(private socketService: SocketService,
              private gameService: GameService,
              private playerService: PlayerService) {
    playerService.setPlayer(new Player(PlayerType.User));
    this.secondsCounter = socketService.retryTimeOutInSeconds;
    this.countDownTimer();
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

  isGameConnected(): boolean {
    return this.isOnline() && this.gameService.isConnected();
  }

  countDownTimer(): void {
    var that = this;
    setInterval(() => {
      if (that.secondsCounter > 0)
        that.secondsCounter--;
    }, 1000);
  }

}
