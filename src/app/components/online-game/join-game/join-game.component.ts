import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { PlayerType } from '../../../enum/PlayerType';
import { GameService } from '../../../services/game.service';
import { PlayerService } from '../../../services/player.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'join-game',
  templateUrl: 'join-game.component.html'
})

export class JoinGameComponent {
  player: Player;

  isInfoSaved: boolean = false;

  // enums
  PlayerType = PlayerType;

  constructor(private gameService: GameService,
              private playerService: PlayerService,
              private socketService: SocketService) {
    this.player = playerService.getPlayer();
  }

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
  }

  setGuest(): void {
    this.player.type = PlayerType.Guest;
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
