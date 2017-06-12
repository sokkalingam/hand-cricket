import { UUID } from 'angular2-uuid';

import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

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
    this.id = UUID.UUID();
    this.type = type;
  }

  isOut(): boolean { return this.status == PlayerStatus.Out; }

  isConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }

}
