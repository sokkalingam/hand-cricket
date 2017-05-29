import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }         from './app.component';
import { NavigationComponent }  from './navigation/navigation.component';
import { GameComponent } from './game/game.component';
import { ProgressBarComponent } from './game/progress_bar/progress-bar.component';

import { HelperService } from './shared/services/helper.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, NavigationComponent, GameComponent, ProgressBarComponent ],
  providers:    [ HelperService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
