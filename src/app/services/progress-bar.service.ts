import { Injectable } from '@angular/core';

@Injectable()
export class ProgressBarService {

  scoreIncrement: number = 20;

  getNextTargetScore(currentScore: number): number {
    var nextTargetScore: number = this.scoreIncrement;
    if (!currentScore) return nextTargetScore;
    while (nextTargetScore < (currentScore * 1.3)) {
      nextTargetScore *= 2;
    }
    return nextTargetScore;
  }

  getBarHeight(runs: number, targetScore: number): number {
    if (targetScore == null)
      targetScore = this.getNextTargetScore(runs);
    return Math.min(100, (runs / (targetScore ? targetScore : 1 )) * 100);
  }

}
