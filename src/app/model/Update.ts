import { UpdateType } from '../enum/UpdateType';

export class Update {
  type: UpdateType;
  message: string;

  constructor(type: UpdateType, message: string) {
    this.type = type;
    this.message = message;
  }
}
