import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  getNextTargetScore(currentScore: number): number {
    var nextTargetScore: number = 20;
    if (!currentScore) return nextTargetScore;
    while (nextTargetScore < currentScore)
      nextTargetScore += 20;
    return nextTargetScore;
  }

}
