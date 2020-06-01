import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Params} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
import {NgForm} from '@angular/forms';
import { GroupsService} from '../../services/groups.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userData = null;
  groupList = [];
  submited = false;
  contactId = null;
  constructor(private groups: GroupsService, private route: ActivatedRoute, private contact: ContactsService, private router: Router) {
    this.route.params.subscribe( (params: Params) => {
      this.contactId = parseInt(params.id, 10);
      this.contact.searchContactId(this.contactId).subscribe( contactData => {
        this.userData = contactData;
      });
    });

  }

  ngOnInit() {
    this.groupList = this.groups.getGroupsNames();
    this.submited = false;
  }

  onSubmit(form: NgForm) {
    /*
    *Check if group was changed.
    */
    if (form.value.group_select !== this.userData.group ) {
      this.groups.removeFromGroup(this.contactId);
      this.groups.addToGroup(this.contactId, form.value.group_select );
    }
    this.contact.updateContact( this.contactId, form);
    this.submited = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    } , 1000);
  }

}
