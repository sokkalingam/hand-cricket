import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

import { PlayerType } from '../../../enum/PlayerType';
import { GameService } from '../../../services/game.service';
import { GameSequenceService } from '../../../services/game-sequence.service';

@Component({
  selector: 'join-game',
  templateUrl: 'join-game.component.html',
  providers: [GameService]
})

export class JoinGameComponent {
  @Input() player: Player;
  @Input() game: Game;

  isInfoSaved: boolean = false;

  // enums
  PlayerType = PlayerType;

  constructor(private gameService: GameService,
              private gameSequenceService: GameSequenceService) { }

  getGameId(): void {
    this.gameService.getGameId(this.player).subscribe(
      (gameId: string) => this.game.id = gameId,
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
    this.gameService.joinGame(this.player, this.game.id).subscribe(
      (game: Game) => this.game = game,
      (error) => this.game = undefined
    );
  }
}
