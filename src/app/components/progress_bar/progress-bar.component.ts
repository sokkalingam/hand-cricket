import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html'
})

export class ProgressBarComponent {
  @Input() targetScore: number;
  @Input() currentScore: number;
}
