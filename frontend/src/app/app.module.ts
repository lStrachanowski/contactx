import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { DashboardComponent } from './routes-components/dashboard/dashboard.component';
import { LandingPageComponent } from './routes-components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AddpanelComponent } from './components/addpanel/addpanel.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { AlphabeticPanelComponent } from './components/alphabetic-panel/alphabetic-panel.component';
import { SearchResultItemComponent } from './components/search-result-item/search-result-item.component';
import { GroupsComponent } from './components/groups/groups.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    DashboardComponent,
    LandingPageComponent,
    HeaderComponent,
    AddpanelComponent,
    SearchPanelComponent,
    AlphabeticPanelComponent,
    SearchResultItemComponent,
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
