import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routes/app-routing.module';

import { AppComponent }         from './app.component';
import { NavigationComponent }  from './components/navigation/navigation.component';
import { OfflineGameComponent } from './components/offline-game/offline-game.component';
import { GameUpdateComponent } from './components/offline-game/game-updates/game-update.component';
import { ScoreBoardComponent } from './components/offline-game/score-board/score-board.component';
import { GameStatusComponent } from './components/offline-game/game-status/game-status.component';
import { GameplayComponent } from './components/offline-game/gameplay/gameplay.component';
import { PlaySelectComponent } from './components/offline-game/play-select/play-select.component';
import { OnlineGameComponent } from './components/online-game/online-game.component';
import { JoinGameComponent } from './components/online-game/join-game/join-game.component';
import { ChatComponent } from './components/online-game/chat/chat.component';
import { PlayComponent } from './components/online-game/play/play.component';
import { OnlineGameStatusComponent } from './components/online-game/online-game-status/online-game-status.component';
import { OnlineScoreBoardComponent } from './components/online-game/online-score-board/online-score-board.component';
import { FeedbackComponent }  from './components/feedback/feedback.component';
import { HowToPlayComponent }  from './components/howtoplay/howtoplay.component';
import { ShareComponent }  from './components/share/share.component';
import { PlayTableComponent }  from './components/shared/play-table/play-table.component';
import { ProgressBarComponent }  from './components/shared/progress-bar/progress-bar.component';

import { SocketService } from './services/socket.service';
import { GameService } from './services/game.service';
import { ApplicationService } from './services/application.service';
import { PlayService } from './services/play.service';
import { PlayerService } from './services/player.service';
import { HelperService } from './services/helper.service';
import { CountdownService } from './services/countdown.service';
import { ChatService } from './services/chat.service';
import { GameAnimationService } from './services/game-animation.service';
import { StatsService } from './services/stats.service';

// External Modules
import { ShareButtonsModule } from 'ngx-sharebuttons';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  AppRoutingModule,
                  RouterModule,
                  HttpModule,
                  BrowserAnimationsModule,
                  ShareButtonsModule.forRoot()
                ],
  declarations: [ AppComponent,
                  NavigationComponent,
                  OfflineGameComponent,
                  GameUpdateComponent,
                  ScoreBoardComponent,
                  GameStatusComponent,
									GameplayComponent,
									PlaySelectComponent,
                  OnlineGameComponent,
                  JoinGameComponent,
                  ChatComponent,
                  PlayComponent,
                  OnlineGameStatusComponent,
                  OnlineScoreBoardComponent,
                  FeedbackComponent,
                  HowToPlayComponent,
                  ShareComponent,
                  PlayTableComponent,
                  ProgressBarComponent
                ],
  providers:    [ SocketService,
                  GameService,
                  ApplicationService,
                  PlayService,
                  PlayerService,
                  HelperService,
                  CountdownService,
                  ChatService,
                  GameAnimationService,
                  StatsService
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
