import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

import { HelperService } from '../services/helper.service';

export class Player {

	id: string;

  name: string;
  lastDelivery: number;
  type: PlayerType;
  runs: number;
  balls: number;
  status: PlayerStatus;
  stompClient: any;

  constructor(type: PlayerType) {
    this.id = HelperService.getRandomId(5);
    this.status = PlayerStatus.NotOut;
    this.type = type;
  }

  isOut(): boolean { return this.status == PlayerStatus.Out; }

  isConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }

}
