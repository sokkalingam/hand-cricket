import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { Game } from '../model/Game';
import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

import { GameService } from './game.service';

@Injectable()
export class PlayerService {

  player: Player;

  constructor(private gs: GameService) {}

  getPlayer(): Player {
    return this.player;
  }

  setPlayer(player: Player): void {
    this.player = player;
  }

  isBatsman(): boolean {
    return this.gs.getGame().batsman.id == this.getPlayer().id;
  }

  isBowler(): boolean {
    return this.gs.getGame().bowler.id == this.getPlayer().id;
  }

  getCurrentPlayer(): Player {
    var game = this.gs.getGame();
    if (game.batsman.id == this.getPlayer().id)
      return game.batsman;
    if (game.bowler.id == this.getPlayer().id)
      return game.bowler;
  }

  getOtherPlayer(): Player {
    var game = this.gs.getGame();
    if (game.batsman.id != this.getPlayer().id)
      return game.batsman;
    if (game.bowler.id != this.getPlayer().id)
      return game.bowler;
  }

  currentPlayerWon(): boolean {
    return this.getCurrentPlayer().status.toString() === PlayerStatus[PlayerStatus.Won];
  }

  currentPlayerLost(): boolean {
    return this.getCurrentPlayer().status.toString() === PlayerStatus[PlayerStatus.Lost];
  }

  isCurrentPlayerOut(): boolean {
    return this.getCurrentPlayer().status.toString() === PlayerStatus[PlayerStatus.Out];
  }

  isOtherPlayerOut(): boolean {
    return this.getOtherPlayer().status.toString() === PlayerStatus[PlayerStatus.Out];
  }

}
