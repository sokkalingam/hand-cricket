import { Injectable } from '@angular/core';

import { Player } from '../model/Player';
import { Game } from '../model/Game';
import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

import { GameService } from './game.service';

@Injectable()
export class PlayerService {

  player: Player;
  infoSaved: boolean;

  constructor(private gs: GameService) {}

  getPlayer(): Player {
    return this.getCurrentPlayer();
  }

  setPlayer(player: Player): void {
    this.player = player;
  }

  isBatsman(): boolean {
    return this.gs.getGame().batsman.id == this.player.id;
  }

  isBowler(): boolean {
    return this.gs.getGame().bowler.id == this.player.id;
  }

  getCurrentPlayer(): Player {
    var game = this.gs.getGame();
    if (game.batsman && game.batsman.id == this.player.id)
      return game.batsman;
    if (game.bowler && game.bowler.id == this.player.id)
      return game.bowler;
    return this.player;
  }

  getOtherPlayer(): Player {
    var game = this.gs.getGame();
    if (game.batsman && game.batsman.id != this.player.id)
      return game.batsman;
    if (game.bowler && game.bowler.id != this.player.id)
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
