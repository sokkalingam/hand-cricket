import { Injectable } from '@angular/core';

@Injectable()
export class PlayService {

  notice: string;
  hightlight: string;
  wait: boolean = false;

  setWait(wait: boolean): void {
    this.wait = wait;
  }

}
