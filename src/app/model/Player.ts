import { PlayerType } from '../enum/PlayerType';

export class Player {
  // name: string;
  type: PlayerType;
  runs: number;
  balls: number;
  status: number;

  constructor(type: PlayerType) {
    this.type = type;
  }
}
