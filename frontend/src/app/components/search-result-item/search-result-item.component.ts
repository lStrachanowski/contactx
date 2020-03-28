import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.css']
})
export class SearchResultItemComponent implements OnInit {
  contactList = [];
  constructor(private contact: ContactsService) {
    this.contactList = contact.getContact();
  }

  ngOnInit() {
    console.log(this.contactList);
  }

}
