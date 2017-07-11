import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { PlayerType } from '../../../enum/PlayerType';
import { GameService } from '../../../services/game.service';
import { PlayerService } from '../../../services/player.service';
import { SocketService } from '../../../services/socket.service';
import { PlayService } from '../../../services/play.service';

@Component({
  selector: 'join-game',
  templateUrl: 'join-game.component.html'
})

export class JoinGameComponent {
  errorMessage: string;
  // enums
  PlayerType = PlayerType;

  constructor(private gameService: GameService,
              private playerService: PlayerService,
              private socketService: SocketService,
              private playService: PlayService) {
  }

  saveInfo(): void {
    this.getNewPlayer();
    this.playerService.infoSaved = true;
  }

  collectInfo(): boolean {
    return !this.playerService.infoSaved;
  }

  getGameId(): void {
    this.gameService.getGameId(this.playerService.getPlayer()).subscribe(
      (gameId: string) => {
        this.gameService.getGame().id = gameId,
        this.socketService.subscribetoGame();
        this.playService.reset();
        this.socketService.ping();
      },
      (error) => console.log(error)
    );
  }

  setHost(): void {
    this.playerService.getPlayer().type = PlayerType.Host;
    this.getGameId();
  }

  setGuest(): void {
    this.playerService.getPlayer().type = PlayerType.Guest;
  }

  joinGame(): void {
    this.gameService.joinGame(this.playerService.getPlayer(), this.gameService.getGame().id).subscribe(
      (game: Game) => {
        this.gameService.setGame(game);
        this.socketService.subscribetoGame();
        this.playService.reset();
        this.socketService.ping();
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Sorry, could not find any open game';
      }
    );
  }

  getNewPlayer(): void {
    this.playerService.getNewPlayer().subscribe(
      (newPlayer: Player) => {
        this.playerService.setPlayer(newPlayer);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
