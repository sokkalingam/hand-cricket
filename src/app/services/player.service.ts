import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/observable';

import { Player } from '../model/Player';
import { Game } from '../model/Game';
import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

import { GameService } from './game.service';
import { ApplicationService } from './application.service';

@Injectable()
export class PlayerService {

  player: Player;
  infoSaved: boolean;

  constructor(private gs: GameService,
              private http: Http,
              private appService: ApplicationService) {}

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

  isOppBatsman(): boolean {
    return this.gs.getGame().batsman.id == this.getOtherPlayer().id;
  }

  isOppBowler(): boolean {
    return this.gs.getGame().bowler.id == this.getOtherPlayer().id;
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

  currentPlayerBatting(): boolean {
    return this.getCurrentPlayer().id == this.gs.getGame().batsman.id;
  }

  otherPlayerBatting(): boolean {
    return this.getOtherPlayer().id == this.gs.getGame().batsman.id;
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

  getNewPlayer(): Observable<Player> {
    return this.http.post(this.appService.baseUrl + '/player/newPlayer', this.player)
      .map((response: Response) => {
        console.log('New Player: ' + JSON.stringify(response));
        return response.json();
    });
  }

}
