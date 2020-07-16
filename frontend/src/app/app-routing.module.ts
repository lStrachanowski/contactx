import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate  } from '@angular/router';
import {DashboardComponent} from './routes-components/dashboard/dashboard.component';
import {LandingPageComponent} from './routes-components/landing-page/landing-page.component';
import {UserCardComponent} from './routes-components/user-card/user-card.component';
import {MobileNotesComponent} from './routes-components/mobile-notes/mobile-notes.component';
import {AddNewContactComponent} from './routes-components/add-new-contact/add-new-contact.component';
import {EditContactComponent} from './routes-components/edit-contact/edit-contact.component';
import {SettingsComponent} from './routes-components/settings/settings.component';
import {Page404Component} from './routes-components/page404/page404.component';
import {UserService} from './services/user.service';
const routes: Routes = [
  {path: '',
  component: LandingPageComponent },
  {path: 'dashboard',
  component: DashboardComponent,
  canActivate: [UserService]},
  {path: 'user/:id/details',
  component: UserCardComponent,
  canActivate: [UserService]},
  {path: 'user/:id/details/notes',
  component: MobileNotesComponent,
  canActivate: [UserService]},
  {path: 'add',
  component: AddNewContactComponent,
  canActivate: [UserService] },
  {path: 'edit/:id',
  component: EditContactComponent,
  canActivate: [UserService]},
  {path: 'settings',
  component: SettingsComponent,
  canActivate: [UserService]},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
