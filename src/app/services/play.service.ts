import { Injectable } from '@angular/core';

@Injectable()
export class PlayService {

  notice: string;
  wait: boolean = false;

  setWait(wait: boolean): void {
    this.wait = wait;
  }

  reset(): void {
    this.notice = '';
    this.wait = false;
  }

  getCurrentPlayerNotice(): string {
    return this.notice.split(';')[0];
  }

  getOtherPlayerNotice(): string {
    return this.notice.split(';')[1];
  }

}
