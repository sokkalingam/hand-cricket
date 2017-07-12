import { Component, Input } from '@angular/core';

import { Game } from '../../../model/Game';
import { Player } from '../../../model/Player';

import { SocketService } from '../../../services/socket.service';
import { GameService } from '../../../services/game.service';
import { PlayService } from '../../../services/play.service';
import { PlayerService } from '../../../services/player.service';
import { HelperService } from '../../../services/helper.service';
import { ProgressBarService } from '../../../services/progress-bar.service';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css',
    '../../../shared/css/price_table.css',
  '../../../shared/css/vertical-progress-bar.css'],
  providers: [ProgressBarService]
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
              private playerService: PlayerService,
              private helperService: HelperService,
              private progressBarService: ProgressBarService,
              private chatService: ChatService) {
    this.game = gameService.getGame();
    this.player = playerService.getPlayer();
    this.socketService.subscribeToNotice();
    this.socketService.subscribeToWait();
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
    return !this.playService.wait;
  }

  sendInput(): void {
    if (!this.playEnabled()) return;
    this.socketService.sendInput(this.input);
    this.clearInputAndUpdates();
  }

  clickInput(num: number) : void {
    this.input = num;
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
  }

  showChat(): void {
    this.chatService.showChat = true;
  }

}
