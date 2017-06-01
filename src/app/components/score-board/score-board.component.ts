import { Component, Input } from '@angular/core';

import { Player } from '../../model/Player';

@Component({
  selector: 'score-board',
  templateUrl: './score-board.component.html'
})

export class ScoreBoardComponent {

  @Input()
  user: Player;

  @Input()
  computer: Player;
  
}
