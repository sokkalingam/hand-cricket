import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { PlayerType } from '../../../enum/PlayerType';
import { GameService } from '../../../services/game.service';
import { GameSequenceService } from '../../../services/game-sequence.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'join-game',
  templateUrl: 'join-game.component.html'
})

export class JoinGameComponent {
  @Input() player: Player;
  // @Input() game: Game;

  isInfoSaved: boolean = false;

  // enums
  PlayerType = PlayerType;

  constructor(private gameService: GameService,
              private gameSequenceService: GameSequenceService,
              private socketService: SocketService) { }

  getGameId(): void {
    this.gameService.getGameId(this.player).subscribe(
      (gameId: string) => {
        this.gameService.getGame().id = gameId,
        this.socketService.subscribetoGame(this.gameService.getGame());
      },
      (error) => console.log(error)
    );
  }

  setHost(): void {
    this.player.type = PlayerType.Host;
    this.getGameId();
    this.gameSequenceService.isHostOrJoinDone = true;
  }

  setGuest(): void {
    this.player.type = PlayerType.Guest;
    this.gameSequenceService.isHostOrJoinDone = true;
  }

  joinGame(): void {
    this.gameService.joinGame(this.player, this.gameService.getGame().id).subscribe(
      (game: Game) => {
        this.gameService.setGame(game);
        console.log(`Updated Game: ${JSON.stringify(this.gameService.getGame())}`);
        this.socketService.subscribetoGame(this.gameService.getGame());
        console.log(`Subscribed Game: ${JSON.stringify(this.gameService.getGame())}`);
      },
      (error) => console.log(error)
    );
  }
}
