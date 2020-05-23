import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';

@Component({
  selector: 'app-addpanel',
  templateUrl: './addpanel.component.html',
  styleUrls: ['./addpanel.component.css']
})
export class AddpanelComponent implements OnInit {

  constructor(private contact: ContactsService) { }
  contactCount = 0;
  ngOnInit() {
    this.contact.getContacsHolder().subscribe( v => {
      this.contactCount = v.length;
    });
  }

}
