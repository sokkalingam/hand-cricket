import { Component, Input } from '@angular/core';

import { Player } from '../../../model/Player';
import { Game } from '../../../model/Game';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})

export class ProgressBarComponent {
  @Input() player: Player;
  @Input() otherPlayer: Player;
  @Input() game: Game;
  @Input() playerHeight: number;
  @Input() otherPlayerHeight: number;
}
