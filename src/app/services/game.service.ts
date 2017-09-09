import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/observable';

import { Player } from '../model/Player';
import { Game } from '../model/Game';

import { PlayerStatus } from '../enum/PlayerStatus';
import { GameStatus } from '../enum/GameStatus';

import { ApplicationService } from './application.service';

import 'rxjs/add/operator/map';

@Injectable()
export class GameService {
  game: Game;

  constructor(private http: Http,
              private appService: ApplicationService) {}

  setGame(game: Game): void {
    this.game = game;
  }

  resetGame(): void {
    this.game = undefined;
  }

  getGame(): Game {
    if (!this.game)
      this.game = new Game();
    return this.game;
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
    return this.http.post(this.appService.baseUrl + '/game/hostGame', player)
      .map((response: Response) => {
        console.log('getGameId: ' + JSON.stringify(response));
        return response.text();
    });
  }

  joinGame(player: Player, id: string): Observable<Game> {
    return this.http.post(this.appService.baseUrl + '/game/joinGame/' + id, player)
      .map((response: Response) => {
        console.log('joinGame: ' + JSON.stringify(response));
        return response.json();
      });
  }

  restartGame(): Observable<string> {
    console.log(`${this.appService.baseUrl}/game/restart/${this.getGame().id}`);
    return this.http.get(`${this.appService.baseUrl}/game/restart/${this.getGame().id}`)
      .map((response: Response) => {
        console.log('restartGame: ' + JSON.stringify(response));
        return response.text();
      });
  }

  isConnected(): boolean {
    return this.getGame().connected;
  }

  isGameOver(): boolean {
    return this.getGame().gameStatus.toString() === GameStatus[GameStatus.GAME_OVER]
      || this.getGame().gameStatus === GameStatus.GAME_OVER;
  }

  isGameDraw(): boolean {
    return this.getGame().gameStatus.toString() === GameStatus[GameStatus.DRAW]
      ||  this.getGame().gameStatus === GameStatus.DRAW;
  }

  isGameInProgress(): boolean {
    return this.getGame().gameStatus.toString() === GameStatus[GameStatus.IN_PROGRESS]
      || this.getGame().gameStatus === GameStatus.IN_PROGRESS;
  }

}
