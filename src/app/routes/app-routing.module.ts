import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from '../components/game/game.component';
import { OnlineGameComponent } from '../components/online-game/online-game.component';

const routes: Routes = [
  {
    path: 'offlineGame',
    component: GameComponent
  },
  {
    path: 'onlineGame',
    component: OnlineGameComponent
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
