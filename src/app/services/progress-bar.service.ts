import { Injectable } from '@angular/core';

@Injectable()
export class ProgressBarService {

  scoreIncrement: number = 20;

  getNextTargetScore(currentScore: number): number {
    var nextTargetScore: number = this.scoreIncrement;
    if (!currentScore) return nextTargetScore;
    while (nextTargetScore < currentScore)
      nextTargetScore += this.scoreIncrement;
    return nextTargetScore;
  }

}
