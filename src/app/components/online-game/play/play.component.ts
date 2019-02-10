import { Component, Input, OnInit } from '@angular/core';

import { Game } from '../../../model/Game';
import { Player } from '../../../model/Player';

import { SocketService } from '../../../services/socket.service';
import { GameService } from '../../../services/game.service';
import { PlayService } from '../../../services/play.service';
import { PlayerService } from '../../../services/player.service';
import { HelperService } from '../../../services/helper.service';
import { ProgressBarService } from '../../../services/progress-bar.service';
import { ChatService } from '../../../services/chat.service';
import { GameAnimationService } from '../../../services/game-animation.service';

import { GameAnimation } from '../../../animations/GameAnimation';

@Component({
  selector: 'play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  providers: [ProgressBarService],
  animations: [GameAnimation]
})

export class PlayComponent implements OnInit {

  player: Player;
  game: Game;
  input: number;
  gameConnected: boolean = false;

  JSON = JSON;

  constructor(public socketService: SocketService,
              public gameService: GameService,
              public playService: PlayService,
              public playerService: PlayerService,
              public helperService: HelperService,
              public progressBarService: ProgressBarService,
              public chatService: ChatService,
              public gameAS: GameAnimationService) { }

  ngOnInit(): void {
    this.game = this.gameService.getGame();
    this.player = this.playerService.getPlayer();
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
    this.gameAS.inputs[num]++;
  }

  restartGame(): void {
    this.clearInputAndUpdates();
    this.gameService.restartGame().subscribe(
      (text: string) => {
        console.log(text);
        this.gameAS.gameRestart++;
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
