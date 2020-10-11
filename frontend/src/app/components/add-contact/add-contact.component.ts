import { Component, OnInit } from '@angular/core';
import { GroupsService} from '../../services/groups.service';
import {NgForm} from '@angular/forms';
import {ContactsService} from '../../services/contacts.service';
import {Router} from '@angular/router';
import {HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  groupList = [];
  submited = false;
  constructor(private groups: GroupsService, private contact: ContactsService, private route: Router, private http: HttpClient,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.groupList = this.groups.getGroupsNames();
    this.submited = false;
  }

  onSubmit(form: NgForm) {
    const cookieToken = this.cookieService.get('token');
    this.http.post('http://127.0.0.1:5000/addcontact', {form_value: form.value, token : cookieToken}).subscribe( response => {
      this.contact.addContact(form);
      this.submited = true;
      this.route.navigate(['/dashboard']);
    }, error => console.log(error.error.error));
  }

}
