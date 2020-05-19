import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  currentObject = null;
  @ViewChild('modalContainerEdit', {static: false}) modalEdit: ElementRef;
  @ViewChild('modalContainerDelete', {static: false}) modalDelete: ElementRef;
  constructor(private contact: ContactsService) { }

  ngOnInit() {
  }

  /*
 * Is trigering proper modal depending on parameter.
 * @param {string} value - modal type
 * @param {object} element - oobject containing type of element and id number of object which will be changed
 */
  openBox(value: string, element?: object) {
    this.currentObject = element;
    if (value === 'delete') {
      this.modalDelete.nativeElement.style.display = 'flex';
    }
    if ( value === 'edit') {
      this.modalEdit.nativeElement.style.display = 'flex';
    }
  }

  /*
 * Ok action for modal depending on parameter.
 * @param {string} value - modal type
 */
  okClick(value: string) {
    if (value === 'delete') {
      this.modalDelete.nativeElement.style.display = 'none';
      if (this.currentObject) {
        this.contact.deleteContact(this.currentObject.element_id);
      }
    }
    if ( value === 'edit') {
      this.modalEdit.nativeElement.style.display = 'none';
    }
  }

/*
 * Cancel action for modal depending on parameter.
 * @param {string} value - modal type
 */
  cancelClick(value: string) {
    if (value === 'delete') {
      this.modalDelete.nativeElement.style.display = 'none';
    }
    if ( value === 'edit') {
      this.modalEdit.nativeElement.style.display = 'none';
    }
  }

}