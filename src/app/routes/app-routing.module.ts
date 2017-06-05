import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from '../components/game/game.component';

const routes: Routes = [
  {
    path: 'offlineGame',
    component: GameComponent
  },
  {
    path: '',
    redirectTo: '/offlineGame',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
