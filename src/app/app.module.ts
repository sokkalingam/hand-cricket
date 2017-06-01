import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }         from './app.component';
import { NavigationComponent }  from './components/navigation/navigation.component';
import { GameComponent } from './components/game/game.component';
import { ProgressBarComponent } from './components/progress_bar/progress-bar.component';
import { GameUpdateComponent } from './components/game-updates/game-update.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent,
                  NavigationComponent,
                  GameComponent,
                  ProgressBarComponent,
                  GameUpdateComponent,
                  ScoreBoardComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
