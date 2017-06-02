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

  PlayerStatus = PlayerStatus;

  userInput: number;
  // computerInput: number;
  // lastPlayedInput: number;

  user: Player = new Player(PlayerType.User);
  computer: Player = new Player(PlayerType.Computer);

  game: Game = new Game();

  // isUserBattingFirst: boolean = undefined;
  // isUserBattingNow: boolean = undefined;
  // gameStatus: number = 0;
  // isOut: boolean = undefined;

  // targetScore: number;
  //
  // updates: Update[] = [];

  /**
  * 0 to 6, total of 7 different outputs from computer
  */
  noOfOutputs: number = 7;

  constructor(private progressBarService: ProgressBarService,
              private updateService: UpdateService) { }

  /**
  * Returns a random number between 0 and 6, both included
  */
  getRandomNumber(): number {
    // return Math.floor(Math.random() * this.noOfOutputs);
    return 0;
  }

  restartGame(): void {
    location.reload();
  }

  isInputValid(): boolean {
    return (this.userInput >= 0 && this.userInput <= 6);
  }

  setOut(player: Player): void {
    var updateType: UpdateType = player.type == PlayerType.User ? UpdateType.DANGER : UpdateType.SUCCESS;
    this.updateService.addUpdate(updateType, `${PlayerType[player.type]} got Out! Scored ${player.runs} runs in ${player.balls} balls`);
    player.status = PlayerStatus.Out;
    player.batted = true;
    player.batting = false;
    if (!player.bowled) player.bowling = true;
  }

  setNotOut(player: Player): void {
    player.status = PlayerStatus.NotOut;
    player.batting = true;
    player.batted = false;
    player.bowling = false;
  }

  getBatsman(): Player {
    return this.user.batting ? this.user : this.computer;
  }

  getBowler(): Player {
    return this.user.bowling ? this.user : this.computer;
  }

  setGameStatus(gameStatus: GameStatus): void {
    this.game.gameStatus = gameStatus;
  }

  setUserInput(): void {
    this.user.lastDelivery = this.userInput;
    this.userInput = undefined;
  }

   setComputerInput(): void {
     this.computer.lastDelivery = this.getRandomNumber();
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

   didInputsMatch(batsman: Player, bowler: Player): boolean {
     var message: string = `${PlayerType[batsman.type]} batted ${batsman.lastDelivery}, ${PlayerType[bowler.type]} bowled ${bowler.lastDelivery}`;
     this.updateService.addUpdate(UpdateType.INFO, message);
     return batsman.lastDelivery == bowler.lastDelivery;
   }

   setTargetScore(): void {
     if (this.getBowler().runs == undefined)
       this.game.targetScore = this.progressBarService.getNextTargetScore(this.getBatsman().runs);
     else
       this.game.targetScore = this.getBowler().runs;
   }

   getUpdates(): void {
     this.game.updates = this.updateService.getUpdates();
   }

   addBalls(player: Player): void {
     player.balls++;
   }

   addRuns(batsman: Player, bowler: Player): void {
     if (batsman.lastDelivery == 0)
        batsman.runs += bowler.lastDelivery;
      else
        batsman.runs += batsman.lastDelivery;
   }

   play(userBatting: boolean): void {

     if (!this.isInputValid()) return;

     this.setComputerInput();
     this.setUserInput();

     if (userBatting)
      this.userBatting();
     else
      this.computerBatting();

      this.runGameThings();
   }

   runGameThings(): void {
      this.setTargetScore();
      this.getUpdates();
   }

  userBatting(): void {

    this.makeBatsman(this.user);
    this.makeBowler(this.computer);

    this.addBalls(this.getBatsman());

    if (this.didInputsMatch(this.getBatsman(), this.getBowler())) {
      this.setOut(this.getBatsman());
    } else {
      this.setNotOut(this.getBatsman());
      this.addRuns(this.getBatsman(), this.getBowler());
    }

    if (this.getBatsman().runs > this.getBowler().runs)
      this.setGameStatus(GameStatus.User_Won);

    if (this.getBatsman().isOut() && this.getBatsman().runs < this.getBowler().runs)
      this.setGameStatus(GameStatus.Computer_Won);

    if (this.getBatsman().isOut() && this.getBatsman().runs == this.getBowler().runs && this.getBatsman().runs != undefined)
        this.setGameStatus(GameStatus.Draw);
  }

  computerBatting(): void {

    this.makeBatsman(this.computer);
    this.makeBowler(this.user);

    this.addBalls(this.getBatsman());

    if (this.didInputsMatch(this.getBatsman(), this.getBowler())) {
      this.setOut(this.getBatsman());
    } else {
      this.setNotOut(this.getBatsman());
      this.addRuns(this.getBatsman(), this.getBowler());
    }

    if (this.getBatsman().runs > this.getBowler().runs)
      this.setGameStatus(GameStatus.Computer_Won);

    if (this.getBatsman().isOut() && this.getBatsman().runs < this.getBowler().runs)
      this.setGameStatus(GameStatus.User_Won);

    if (this.getBatsman().isOut() && this.getBatsman().runs == this.getBowler().runs && this.getBatsman().runs != undefined)
        this.setGameStatus(GameStatus.Draw);
  }

  choseToBat(): void {
    this.makeBatsman(this.user);
    this.makeBowler(this.computer);
  }

  choseToBowl(): void {
    this.makeBatsman(this.computer);
    this.makeBowler(this.user);
  }

}
