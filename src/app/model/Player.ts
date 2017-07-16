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

  constructor(type: PlayerType) {
    this.id = HelperService.getRandomId(5);
    this.status = PlayerStatus.NotOut;
    this.type = type;
  }

  isOut(): boolean { return this.status == PlayerStatus.Out; }

}
