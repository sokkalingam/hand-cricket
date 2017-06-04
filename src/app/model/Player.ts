import { UUID } from 'angular2-uuid';

import { PlayerType } from '../enum/PlayerType';
import { PlayerStatus } from '../enum/PlayerStatus';

export class Player {

	id: string = UUID.UUID();

  name: string;
  lastDelivery: number;
  type: PlayerType;
  runs: number;
  balls: number;
  status: PlayerStatus;

  constructor(type: PlayerType) {
    this.type = type;
  }

  isOut(): boolean { return this.status == PlayerStatus.Out; }

}
