import { Component, Input } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})

export class GameComponent {

  firstBatting: boolean = undefined;
  winner: string = undefined;

  userInput: number;
  computerInput: number;
  lastPlayedInput: number;
  status: string;

  noOfBallsPlayed: number = 0;
  totalNoOfBallsPlayed: number = 0;
  runsScored: number = 0;
  totalNumberOfRunsScored: number = 0;

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

  bat(): void {

    this.play();
    this.userRuns = this.totalNumberOfRunsScored + this.runsScored;
    this.userBalls = this.totalNoOfBallsPlayed + this.noOfBallsPlayed;

    // first batting, play till outputs

    // already batted, play till out or you beat the score

    if (this.userRuns > this.computerRuns) {
        this.winner = "User";
    }

    if (this.status == 'OUT') {
        if (this.userRuns < this.computerRuns)
          this.winner = "Computer";
        if (this.firstBatting)
          this.toBowl();
    }
  }

  bowl(): void {

    this.play();
    this.computerRuns = this.totalNumberOfRunsScored + this.runsScored;
    this.computerBalls = this.totalNoOfBallsPlayed + this.noOfBallsPlayed;

    // if you batted first, bowl till out or your score is beaten
    // if you have not batted already, bowl till out


    if (this.computerRuns > this.userRuns) {
      this.winner = "Computer";
    }

    if (this.status == 'OUT') {
        if (this.userRuns > this.computerRuns)
          this.winner = "User";
        if (this.firstBatting == false)
          this.toBat();
    }
  }

  /**
  * Play Game
  */
  play(): void {

    if (this.userInput < 0 || this.userInput > 6)
      return;

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

  toBat(): void {
    this.firstBatting = true;
  }

  toBowl(): void {
    this.firstBatting = false;
  }

  restartGame(): void {
    location.reload();
  }
}
