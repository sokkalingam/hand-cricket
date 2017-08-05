import { Injectable } from '@angular/core';

@Injectable()
export class ProgressBarService {

  nextTargetScore: number = 20;

  getNextTargetScore(currentScore: number): number {
    if (!currentScore) return this.nextTargetScore;
    while (this.nextTargetScore < (currentScore * 1.3))
      this.nextTargetScore *= 2;
    return this.nextTargetScore;
  }

  getBarHeight(runs: number, targetScore: number): number {
    if (targetScore == null)
      targetScore = this.getNextTargetScore(runs);
    return Math.min(100, (runs / (targetScore ? targetScore : 1 )) * 100);
  }

}
