import { Component, OnInit } from '@angular/core';
import {Params} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  userID = null;
  deleted = false;
  constructor(private route: ActivatedRoute, private contact: ContactsService) {
    this.route.params.subscribe( (params: Params) => {
      this.userID = params.id;
    });
  }

  ngOnInit() {
    this.contact.deleted.subscribe(val => {
      this.deleted = val;
    });
  }

}
