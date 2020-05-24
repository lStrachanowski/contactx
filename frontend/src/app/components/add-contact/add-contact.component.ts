import { Component, OnInit } from '@angular/core';
import { GroupsService} from '../../services/groups.service';
import {NgForm} from '@angular/forms';
import {ContactsService} from '../../services/contacts.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  groupList = [];
  submited = false;
  constructor(private groups: GroupsService, private contact: ContactsService, private route: Router) { }

  ngOnInit() {
    this.groupList = this.groups.getGroupsNames();
    this.submited = false;
  }

  onSubmit(form: NgForm) {
    this.contact.addContact(form);
    this.submited = true;
    setTimeout(() => {
      this.route.navigate(['/dashboard']);
    } , 1000);
  }

}
