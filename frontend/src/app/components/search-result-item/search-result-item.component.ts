import { Component, OnInit , ViewChild } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {ShortString} from '../../pipes/short-string.pipe';
import { from } from 'rxjs';
import {RouterLink} from '@angular/router';
import {ModalComponent} from '../../components/modal/modal.component';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.css']
})
export class SearchResultItemComponent implements OnInit {
  contactList = [];

  @ViewChild('modalBox', {static: false}) modal: ModalComponent;
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

    /*
  * Trigers delete confirmation box.
  */
 deleteClick() {
  this.modal.openBox('delete');
}

}
