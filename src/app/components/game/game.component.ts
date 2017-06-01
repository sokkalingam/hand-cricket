import { Component } from '@angular/core';

import { Update } from '../../model/Update';
import { Player } from '../../model/Player';

import { UpdateType } from '../../enum/UpdateType';

import { ProgressBarService } from '../../services/progress-bar.service';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  providers: [ProgressBarService, UpdateService]
})

export class GameComponent {

  userInput: number;
  computerInput: number;
  lastPlayedInput: number;

  user: Player = new Player("You");
  computer: Player = new Player("Computer");

  isUserBattingFirst: boolean = undefined;
  isUserBattingNow: boolean = undefined;
  gameStatus: number = 0;
  isOut: boolean = undefined;

  targetScore: number;

  updates: Update[] = [];

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

  setOut(): void {
    var batsman: Player = this.getBatsman();
    var updateType: UpdateType = this.isUserBattingNow ? UpdateType.DANGER : UpdateType.SUCCESS;
    this.updateService.addUpdate(updateType, `${batsman.name} got Out! Scored ${batsman.runs} runs in ${batsman.balls} balls`);
    this.isOut = true;
  }

  setNotOut(): void { this.isOut = false; }

  getBatsman(): Player {
    return this.isUserBattingNow ? this.user : this.computer;
  }

  getBowler(): Player {
    return this.isUserBattingNow ? this.computer : this.user;
  }

  setGameStatus(num: number): void {
    this.gameStatus = num;
  }

  setUserInput(): void {
    this.lastPlayedInput = this.userInput;
    this.userInput = undefined;
  }

   setComputerInput(): void {
     this.computerInput = this.getRandomNumber();
   }

   initPlayer(player: Player): Player {
     if (player.balls == undefined) player.balls = 0;
     if (player.runs == undefined)  player.runs  = 0;
     return player;
   }

   didInputsMatch(userInput: number, computerInput: number): boolean {
     var message: string = null;
     if (this.isUserBattingNow)
       message = `You batted ${userInput}, Computer bowled ${computerInput}`;
     else
        message = `Computer batted ${computerInput}, You bowled ${userInput}`;
     this.updateService.addUpdate(UpdateType.INFO, message);
     return userInput == computerInput;
   }

   setTargetScore(): void {
     if (this.getBowler().runs == undefined) {
       this.targetScore = this.progressBarService.getNextTargetScore(this.getBatsman().runs);
     } else {
       this.targetScore = this.getBowler().runs;
     }
   }

   getUpdates(): void {
     this.updates = this.updateService.getUpdates();
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

    this.isUserBattingNow = true;
    this.user = this.initPlayer(this.user);

    if (this.didInputsMatch(this.lastPlayedInput, this.computerInput)) {
      this.isUserBattingFirst = !this.isUserBattingFirst;
      this.user.balls++;
      this.setOut();
    } else {
      this.setNotOut();
      if (this.lastPlayedInput == 0)
        this.user.runs += this.computerInput;
      else
        this.user.runs += this.lastPlayedInput;
      this.user.balls++;
    }

    if (this.user.runs > this.computer.runs)
      this.setGameStatus(1);

    if (this.isOut && this.user.runs < this.computer.runs)
      this.setGameStatus(2);

    if (this.isOut && this.user.runs == this.computer.runs && this.user.runs != undefined)
        this.setGameStatus(3);
  }

  computerBatting(): void {

    this.isUserBattingNow = false;
    this.computer = this.initPlayer(this.computer);

    if (this.didInputsMatch(this.lastPlayedInput, this.computerInput)) {
      this.isUserBattingFirst = !this.isUserBattingFirst;
      this.computer.balls++;
      this.setOut();
    } else {
      this.setNotOut();
      if (this.computerInput == 0)
        this.computer.runs += this.lastPlayedInput;
      else
        this.computer.runs += this.computerInput;
      this.computer.balls++;
    }

    if (this.isOut && this.user.runs > this.computer.runs)
      this.setGameStatus(1);

    if (this.computer.runs > this.user.runs)
      this.setGameStatus(2);

    if (this.isOut && this.user.runs == this.computer.runs && this.computer.runs != undefined)
        this.setGameStatus(3);
  }

  choseToBat(): void {
    this.isUserBattingFirst = true;
  }

  choseToBowl(): void {
    this.isUserBattingFirst = false;
  }

}
