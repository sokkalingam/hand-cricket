import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './routes/app-routing.module';

import { AppComponent }         from './app.component';
import { NavigationComponent }  from './components/navigation/navigation.component';
import { GameComponent } from './components/game/game.component';
import { ProgressBarComponent } from './components/progress_bar/progress-bar.component';
import { GameUpdateComponent } from './components/game-updates/game-update.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { GameStatusComponent } from './components/game-status/game-status.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';
import { PlaySelectComponent } from './components/play-select/play-select.component';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  AppRoutingModule,
                  RouterModule,
                  HttpModule
                ],
  declarations: [ AppComponent,
                  NavigationComponent,
                  GameComponent,
                  ProgressBarComponent,
                  GameUpdateComponent,
                  ScoreBoardComponent,
                  GameStatusComponent,
									GameplayComponent,
									PlaySelectComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
