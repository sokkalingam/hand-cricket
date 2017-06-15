import { Injectable } from '@angular/core';

import { UUID } from 'angular2-uuid';

import * as _ from 'lodash';

@Injectable()
export class HelperService {

  static getRandomId(len: number): string {
    var id = UUID.UUID();
    id = _.replace(id, /-/g, '');
    id = id.substring(0, len);
    id = id.toUpperCase();
    return id;
  }
}
