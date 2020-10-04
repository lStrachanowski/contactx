import { Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import { from } from 'rxjs';
import {HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ContactsService} from '../../services/contacts.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: HttpClient, private cookieService: CookieService,private contact: ContactsService, private user: UserService ) {
  }

  ngOnInit() {
    const cookieToken = this.cookieService.get('token');
    this.http.post('http://127.0.0.1:5000/dashboard', { token : cookieToken }).subscribe( response => {
      this.contact.initializeData(response);
    });
    const refresh = setInterval(() => {
      this.http.post('http://127.0.0.1:5000/tokentime', { token : cookieToken }).subscribe( response => {
      const fieldName = 'validity';
      if (JSON.parse(response[fieldName])) {
      } else {
        this.user.loginStatus.next(false);
      }
    }); }, 1000);
    this.user.currentLoginStatus.subscribe( value => {
      if (!value) {
        clearInterval(refresh);
      }
    });
  }


}
