import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/observable';

import { Player } from '../model/Player';
import { Game } from '../model/Game';

import { PlayerStatus } from '../enum/PlayerStatus';
import { GameStatus } from '../enum/GameStatus';

import 'rxjs/add/operator/map';

@Injectable()
export class GameService {

  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: Http) {

  }

  makeBatsman(game: Game, player: Player): Player {
    if (player.balls == undefined) player.balls = 0;
    if (player.runs == undefined)  player.runs  = 0;
    player.status = PlayerStatus.NotOut;
    game.setBatsman(player);
    return player;
  }

  makeBowler(game: Game, player: Player): Player {
    game.setBowler(player);
    return player;
  }

  setPlayersAndGame(game: Game, batsman: Player, bowler: Player): void {
    this.makeBatsman(game, batsman);
    this.makeBowler(game, bowler);
    game.gameStatus = GameStatus.IN_PROGRESS;
  }

  getGameId(player: Player): Observable<string> {
    return this.http.post(this.baseUrl + '/hostGame', player)
      .map((response: Response) => {
        console.log(response.text());
        return response.text();
    });
  }

  joinGame(player: Player, id: string): Observable<Game> {
    return this.http.post(this.baseUrl + '/joinGame/' + id, player)
      .map((response: Response) => {
        console.log(response.json());
        return response.json();
      });
  }

  isConnected(game: Game): boolean {
    return game.batsman != undefined && game.bowler != undefined;
  }

}
