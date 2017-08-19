import { Injectable } from '@angular/core';

@Injectable()
export class CountdownService {
  timer: number;
  interval: any;

  countdown(): void {
    if (this.timer) return;
    this.timer = 60;
    var that = this;
    this.interval = setInterval(() => {
      if (that.timer > 0)
        that.timer--;
      else
        clearInterval(that.interval);
    }, 1000);
  }
}
