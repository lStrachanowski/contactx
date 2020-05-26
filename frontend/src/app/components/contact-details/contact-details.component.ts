import { Component, OnInit, ViewChild } from '@angular/core';
import {Params} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../../services/contacts.service';
import {ModalComponent} from '../../components/modal/modal.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contactData = null;
  userID = null;
  @ViewChild('modalBox', {static: false}) modal: ModalComponent;
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


  /*
  * Trigers delete confirmation box.
  * @param {string} element - element type.
  */
 deleteClick(elementValue: string) {
  this.modal.openBox('delete', {element: elementValue, element_id: parseInt(this.userID, 10) , owner: 'contact'});
}

}
