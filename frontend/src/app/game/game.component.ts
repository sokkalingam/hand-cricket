import { Component, Input } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})

export class GameComponent {
  userInput: number;
  computerInput: number;
  status: string;

  noOfBallsPlayed: number = 0;
  runsScored: number = 0;

  noOfOutputs: number = 7;

  /**
  * Returns a random number between 0 and 6, both included
  */
  getRandomNumber(): number {
    return Math.floor(Math.random() * this.noOfOutputs);
  }

  play(): void {
    this.computerInput = this.getRandomNumber();

    if (this.computerInput == this.userInput) {
        this.status = "OUT";
        this.runsScored = 0;
        this.noOfBallsPlayed = 0;
    } else {
      this.status = undefined;
      this.addRuns(this.userInput);
      this.addBallsPlayed();
    }
  }

  addRuns(run: number): void {
    this.runsScored += run;
  }

  addBallsPlayed(): void {
    this.noOfBallsPlayed++;
  }
}
