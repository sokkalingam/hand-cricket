import { Injectable } from '@angular/core';

import { Update } from '../model/Update';
import { UpdateType } from '../enum/UpdateType';

@Injectable()
export class UpdateService {
  updates: Update[] = [];
  noOfUpdates: number = 5;

  addUpdate(type: UpdateType, message: string): void {
    this.updates.unshift(new Update(type, message));
  }

  getUpdates(): Update[] {
    if (this.updates.length > this.noOfUpdates)
      this.updates.pop();
    return this.updates;
  }
}
