import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  constructor(private contact: ContactsService) { }

  ngOnInit() {
  }

  inputValue(event: any) {
    this.contact.contactSearch(event.target.value);
  }
}
