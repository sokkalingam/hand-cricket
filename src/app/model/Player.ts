import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

import { HelperService } from '../services/helper.service';

export class Player {

	id: string;
  name: string;
  runs: number;
  balls: number;
  lastDelivery: number;
  type: PlayerType;
  status: PlayerStatus;
  wins: number = 0;

  constructor(type: PlayerType) {
    this.type = type;
    this.status = PlayerStatus.NotOut;
  }

  isOut(): boolean { return this.status == PlayerStatus.Out; }

}
