import { Component, Input } from '@angular/core';

import { Update } from '../model/Update';
import { Player } from '../model/Player';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})

export class GameComponent {

  userInput: number;
  computerInput: number;
  lastPlayedInput: number;

  user: Player = new Player();
  computer: Player = new Player();

  isUserBattingFirst: boolean = undefined;
  isUserBattingNow: boolean = undefined;
  gameStatus: number = 0;
  isOut: boolean = undefined;

  updates: Update[] = [];

  /**
  * 0 to 6, total of 7 different outputs from computer
  */
  noOfOutputs: number = 7;

  /**
  * Returns a random number between 0 and 6, both included
  */
  getRandomNumber(): number {
    return Math.floor(Math.random() * this.noOfOutputs);
  }

  restartGame(): void {
    location.reload();
  }

  isInputValid(): boolean {
    return (this.userInput >= 0 && this.userInput <= 6);
  }

  setOut(): void {
    this.isOut = true;
  }
  setNotOut(): void { this.isOut = false; }

  setGameStatus(num: number): void { this.gameStatus = num; }

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

  userBatting(): void {

    this.isUserBattingNow = true;

    if (!this.isInputValid()) return;

    this.user = this.initPlayer(this.user);

    this.setComputerInput();
    this.setUserInput();

    if (this.lastPlayedInput == this.computerInput) {
      this.setOut();
      this.isUserBattingFirst = !this.isUserBattingFirst;
      this.user.balls++;
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

    if (!this.isInputValid()) return;

    this.computer = this.initPlayer(this.computer);

    this.setComputerInput();
    this.setUserInput();

    if (this.lastPlayedInput == this.computerInput) {
      this.setOut();
      this.isUserBattingFirst = !this.isUserBattingFirst;
      this.computer.balls++;
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

  addUpdate(level: number, message: string): void {
    this.updates.push(new Update(level, message));
  }

}
