import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfflineGameComponent } from '../components/offline-game/offline-game.component';
import { OnlineGameComponent } from '../components/online-game/online-game.component';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { HowToPlayComponent }  from '../components/howtoplay/howtoplay.component';

const routes: Routes = [
  {
    path: 'offlineGame',
    component: OfflineGameComponent
  },
  {
    path: 'onlineGame',
    component: OnlineGameComponent
  },
  {
    path: 'howtoplay',
    component: HowToPlayComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  { path: '**',
    redirectTo: '/offlineGame',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
