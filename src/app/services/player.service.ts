import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { Game } from '../model/Game';
import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

import { GameService } from './game.service';

@Injectable()
export class PlayerService {

  player: Player;

  constructor(private gameService: GameService) {}

  getPlayer(): Player {
    return this.player;
  }

  setPlayer(player: Player): void {
    this.player = player;
  }

  isBatsman(game: Game): boolean {
    return game.batsman.id == this.getPlayer().id;
  }

  isBowler(game: Game): boolean {
    return game.bowler.id == this.getPlayer().id;
  }

  getCurrentPlayer(game: Game): Player {
    if (game.batsman.id == this.getPlayer().id)
      return game.batsman;
    if (game.bowler.id == this.getPlayer().id)
      return game.bowler;
  }

  getOtherPlayer(game: Game): Player {
    if (game.batsman.id != this.getPlayer().id)
      return game.batsman;
    if (game.bowler.id != this.getPlayer().id)
      return game.bowler;
  }

  currentPlayerWon(game: Game): boolean {
    return this.getCurrentPlayer(game).status.toString() === PlayerStatus[PlayerStatus.Won];
  }

  currentPlayerLost(game: Game): boolean {
    return this.getCurrentPlayer(game).status.toString() === PlayerStatus[PlayerStatus.Lost];
  }

  isCurrentPlayerOut(game: Game): boolean {
    return this.getCurrentPlayer(game).status.toString() === PlayerStatus[PlayerStatus.Out];
  }

  isOtherPlayerOut(game: Game): boolean {
    return this.getOtherPlayer(game).status.toString() === PlayerStatus[PlayerStatus.Out];
  }

}
