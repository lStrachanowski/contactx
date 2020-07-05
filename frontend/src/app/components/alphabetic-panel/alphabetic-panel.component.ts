import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';

@Component({
  selector: 'app-alphabetic-panel',
  templateUrl: './alphabetic-panel.component.html',
  styleUrls: ['./alphabetic-panel.component.css']
})
export class AlphabeticPanelComponent implements OnInit {
  letters = 'abcdefghijklmnopqrstuvwxyz';
  lettersArray = this.letters.split('');
  show = false;
  constructor(private contact: ContactsService) { }

  ngOnInit() {
  }

  showPanel() {
    this.show = this.show === true ? false : true;
  }

  letterClick(letter: string) {
    this.contact.contactByLetter(letter);
  }

}
