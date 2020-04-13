import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './routes-components/dashboard/dashboard.component';
import {LandingPageComponent} from './routes-components/landing-page/landing-page.component';
import {UserCardComponent} from './routes-components/user-card/user-card.component';
import {MobileNotesComponent} from './routes-components/mobile-notes/mobile-notes.component';

const routes: Routes = [
  {path: '',
  component: LandingPageComponent },
  {path: 'dashboard',
  component: DashboardComponent},
  {path: 'user/:id/details',
  component: UserCardComponent},
  {path: 'user/:id/details/notes',
  component: MobileNotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
