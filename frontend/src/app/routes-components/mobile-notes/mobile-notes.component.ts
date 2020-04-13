import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {Params} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mobile-notes',
  templateUrl: './mobile-notes.component.html',
  styleUrls: ['./mobile-notes.component.css']
})
export class MobileNotesComponent implements OnInit {
  userID = null;
  notesData = null;
  contactData = null;
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
