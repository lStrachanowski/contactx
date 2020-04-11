import { Component, OnInit } from '@angular/core';
import {Params} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contactData = null;
  userID = null;
  constructor(private route: ActivatedRoute, private contact: ContactsService) {
    this.route.params.subscribe( (params: Params) => {
      this.userID = params.id;
    });
    if (this.userID !== null) {
      this.contact.searchContactId(parseInt(this.userID, 10)).subscribe(val => {
        this.contactData = val;
      });
    }
  }
  ngOnInit() {
  }
}
