import { Component, Input } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})

export class GameComponent {

  userInput: number;
  computerInput: number;
  lastPlayedInput: number;
  status: string;

  noOfBallsPlayed: number = 0;
  totalNoOfBallsPlayed: number = 0;
  runsScored: number = 0;
  totalNumberOfRunsScored: number = 0;

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

  /**
  * Play Game
  */
  play(): void {
    if (!this.userInput) return;

    this.lastPlayedInput = this.userInput;
    this.computerInput = this.getRandomNumber();

    if (this.computerInput == this.userInput) {
        this.status = "OUT";
        this.totalNoOfBallsPlayed = this.noOfBallsPlayed;
        this.totalNumberOfRunsScored = this.runsScored;
        this.runsScored = 0;
        this.noOfBallsPlayed = 0;
    } else {
        this.status = undefined;
        this.addRuns(this.userInput);
        this.addBallsPlayed();
        this.totalNoOfBallsPlayed = 0;
        this.totalNumberOfRunsScored = 0;
    }

    this.userInput = undefined;
  }

  addRuns(run: number): void {
    this.runsScored += run;
  }

  addBallsPlayed(): void {
    this.noOfBallsPlayed++;
  }
}
