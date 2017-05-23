import { Component, Input } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})

export class GameComponent {

  userInput: number;
  computerInput: number;
  lastPlayedInput: number;

  userRuns: number = undefined;
  computerRuns: number = undefined;

  userBalls: number = undefined;
  computerBalls: number = undefined;

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

isUserBattingFirst: boolean = undefined;
gameStatus: number = 0;
isOut: boolean = undefined;

isInputValid(): boolean {
  return (this.userInput >= 0 && this.userInput <= 6);
}

userBatting(): void {

  if (!this.isInputValid()) return;

  if (this.userRuns == undefined) this.userRuns = 0;
  if (this.userBalls == undefined) this.userBalls = 0;

  this.lastPlayedInput = this.userInput;
  this.computerInput = this.getRandomNumber();

  if (this.userInput == this.computerInput) {
    this.isOut = true;
    this.isUserBattingFirst = !this.isUserBattingFirst;
    this.userBalls++;
  } else {
    this.isOut = false;

    if (this.userInput == 0)
      this.userRuns += this.computerInput;
    else
      this.userRuns += this.userInput;
    this.userBalls++;
  }

  this.userInput = undefined;

  if (this.userRuns > this.computerRuns)
    this.gameStatus = 1;

  if (this.isOut && this.userRuns < this.computerRuns)
    this.gameStatus = 2;

  if (this.isOut && this.userRuns == this.computerRuns && this.userRuns != undefined)
      this.gameStatus = 3;
}

computerBatting(): void {

  if (!this.isInputValid()) return;

  if (this.computerRuns == undefined) this.computerRuns = 0;
  if (this.computerBalls == undefined) this.computerBalls = 0;

  this.lastPlayedInput = this.userInput;
  this.computerInput = this.getRandomNumber();

  if (this.userInput == this.computerInput) {
    this.isOut = true;
    this.isUserBattingFirst = !this.isUserBattingFirst;
    this.computerBalls++;
  } else {
    this.isOut = false;

    if (this.computerInput == 0)
      this.computerRuns += this.userInput;
    else
      this.computerRuns += this.computerInput;
    this.computerBalls++;
  }

  this.userInput = undefined;

  if (this.isOut && this.userRuns > this.computerRuns)
    this.gameStatus = 1;

  if (this.computerRuns > this.userRuns)
    this.gameStatus = 2;

  if (this.isOut && this.userRuns == this.computerRuns && this.computerRuns != undefined)
      this.gameStatus = 3;
}

choseToBat(): void {
  this.isUserBattingFirst = true;
}

choseToBowl(): void {
  this.isUserBattingFirst = false;
}

}
