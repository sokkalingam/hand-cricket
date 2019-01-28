import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GameAnimationService } from '../../../services/game-animation.service';

import { GameAnimation } from '../../../animations/GameAnimation';

@Component({
  selector: 'numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.css'],
  animations: [GameAnimation]
})

export class NumpadComponent {

  numbers = [0, 1, 2, 3, 4, 5, 6];

  @Input() disable: boolean;
  @Output() numPressedEvent: EventEmitter<number> = new EventEmitter();

  constructor(private gameAS: GameAnimationService) { }

  clickInput(num: number): void {
    this.numPressedEvent.emit(num);
  }

}
