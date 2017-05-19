import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent }         from './app.component';
import { NavigationComponent }  from './navigation/navigation.component';
import { GameComponent } from './game/game.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, NavigationComponent, GameComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
