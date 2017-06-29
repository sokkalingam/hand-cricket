import { Component, Input } from '@angular/core';

import { Game } from '../../../model/Game';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html'
})

export class ProgressBarComponent {
  @Input() game: Game;
}
