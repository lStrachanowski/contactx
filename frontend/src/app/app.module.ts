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
import {ShortString} from './pipes/short-string.pipe';
import { UserCardComponent } from './routes-components/user-card/user-card.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { NotesComponent } from './components/notes/notes.component';
import { MobileNotesComponent } from './routes-components/mobile-notes/mobile-notes.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { AddNewContactComponent } from './routes-components/add-new-contact/add-new-contact.component';
import { ModalComponent } from './components/modal/modal.component';
import {FormsModule} from '@angular/forms';

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
    GroupsComponent,
    ShortString,
    UserCardComponent,
    ContactDetailsComponent,
    NotesComponent,
    MobileNotesComponent,
    AddNoteComponent,
    AddContactComponent,
    AddNewContactComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
