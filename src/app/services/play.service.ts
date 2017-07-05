import { Injectable } from '@angular/core';

@Injectable()
export class PlayService {

  notice: string = 'Game Updates will be displayed here';
  hightlight: string;
  wait: boolean = false;

  setWait(wait: boolean): void {
    this.wait = wait;
  }

}
