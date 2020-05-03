import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {ShortString} from '../../pipes/short-string.pipe';
import { from } from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.css']
})
export class SearchResultItemComponent implements OnInit {
  contactList = [];
  constructor(private contact: ContactsService) {
    this.contact.currentContacts.subscribe(values => {
      this.contactList = values;
    });
  }

  ngOnInit() {
  }

  optionsClick(id: number) {
    this.contact.contactEdit(id);
  }

}
