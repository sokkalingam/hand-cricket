import { Injectable } from '@angular/core';

@Injectable()
export class PlayService {

  templateMessage = 'Game Updates will be displayed here';
  notice: string = this.templateMessage;
  hightlight: string;
  wait: boolean = false;

  setWait(wait: boolean): void {
    this.wait = wait;
  }

  reset(): void {
    this.notice = this.templateMessage;
    this.hightlight = '';
    this.wait = false;
  }

}
