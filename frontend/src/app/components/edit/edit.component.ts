import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Params} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
import {NgForm} from '@angular/forms';
import { GroupsService} from '../../services/groups.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userData = null;
  groupList = [];
  submited = false;
  constructor(private groups: GroupsService, private route: ActivatedRoute, private contact: ContactsService) {
    this.route.params.subscribe( (params: Params) => {
      this.contact.searchContactId(parseInt(params.id, 10)).subscribe( contactData => {
        this.userData = contactData;
      });
    });

  }

  ngOnInit() {
    this.groupList = this.groups.getGroupsNames();
    this.submited = false;

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
