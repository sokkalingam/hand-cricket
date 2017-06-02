import { Component } from '@angular/core';

import { Update } from '../../model/Update';
import { Player } from '../../model/Player';
import { Game } from '../../model/Game';

import { UpdateType } from '../../enum/UpdateType';
import { PlayerType } from '../../enum/PlayerType';
import { PlayerStatus } from '../../enum/PlayerStatus';
import { GameStatus } from '../../enum/GameStatus';

import { ProgressBarService } from '../../services/progress-bar.service';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  providers: [ProgressBarService, UpdateService]
})

export class GameComponent {

  /**
  * Init Enums
  */
  PlayerStatus = PlayerStatus;
  PlayerType = PlayerType;
  GameStatus = GameStatus;

  userInput: number;

  user: Player = new Player(PlayerType.User);
  computer: Player = new Player(PlayerType.Computer);

  game: Game = new Game();

  constructor(private progressBarService: ProgressBarService,
              private updateService: UpdateService) { }

  // setOut(player: Player): void {
  //   var updateType: UpdateType = player.type == PlayerType.User ? UpdateType.DANGER : UpdateType.SUCCESS;
  //   this.updateService.addUpdate(updateType, `${PlayerType[player.type]} got Out! Scored ${player.runs} runs in ${player.balls} balls`);
  //   player.status = PlayerStatus.Out;
  //   player.batted = true;
  //   player.batting = false;
  // }
	//
  // setNotOut(player: Player): void {
  //   player.status = PlayerStatus.NotOut;
  //   player.batting = true;
  //   player.batted = false;
  // }

  getBatsman(): Player {
    return this.user.batting ? this.user : this.computer;
  }

  getBowler(): Player {
    return this.user.bowling ? this.user : this.computer;
  }

  setGameStatus(gameStatus: GameStatus): void {
    this.game.gameStatus = gameStatus;
  }

   makeBatsman(player: Player): Player {
     if (player.balls == undefined) player.balls = 0;
     if (player.runs == undefined)  player.runs  = 0;
     player.status = PlayerStatus.NotOut;
     player.batting = true;
     player.batted = false;
     return player;
   }

   makeBowler(player: Player): Player {
     player.bowling = true;
     player.bowled = false;
     return player;
   }

  choseToBat(): void {
    this.makeBatsman(this.user);
    this.makeBowler(this.computer);
    this.setGameStatus(GameStatus.IN_PROGRESS);
  }

  choseToBowl(): void {
    this.makeBatsman(this.computer);
    this.makeBowler(this.user);
    this.setGameStatus(GameStatus.IN_PROGRESS);
  }

}
