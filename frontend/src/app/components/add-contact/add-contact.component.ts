import { Component, OnInit } from '@angular/core';
import { GroupsService} from '../../services/groups.service';
import {NgForm} from '@angular/forms';
import {ContactsService} from '../../services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  groupList = [];
  constructor(private groups: GroupsService, private contact: ContactsService) { }

  ngOnInit() {
    this.groupList = this.groups.getGroupsNames();
  }

  onSubmit(form: NgForm) {
    this.contact.addContact(form);
  }

}
