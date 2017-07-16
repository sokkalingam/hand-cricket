import { Component, Input } from '@angular/core';

import { Update } from '../../../model/Update';

@Component({
  selector: 'game-update',
  templateUrl: 'game-update.component.html'
})

export class GameUpdateComponent {
  @Input()
  updates: Update[];
}
