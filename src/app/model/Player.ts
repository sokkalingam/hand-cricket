import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

export class Player {
  name: string;
  lastDelivery: number;
  type: PlayerType;
  runs: number;
  balls: number;
  status: PlayerStatus;

  batting: boolean;
  bowling: boolean;
  batted: boolean;
  bowled: boolean;

  constructor(type: PlayerType) {
    this.type = type;
  }

  isOut(): boolean {
    return this.status == PlayerStatus.Out;
  }
}
