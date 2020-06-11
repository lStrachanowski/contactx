import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {Router} from '@angular/router';
import {GroupsService} from '../../services/groups.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  deleted = false;
  currentObject = null;
  editValue = null;
  @ViewChild('modalContainerEdit', {static: false}) modalEdit: ElementRef;
  @ViewChild('modalContainerDelete', {static: false}) modalDelete: ElementRef;
  constructor(private contact: ContactsService, private route: Router, private groups: GroupsService) { }

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
      this.editValue = null;
      this.editValue = this.currentObject.element_id;
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
        if (this.currentObject.owner === 'contact') {
          this.contact.deleteContact(this.currentObject.element_id);
          this.contact.deleted.next(true);
          setTimeout(() => {
            this.route.navigate(['/dashboard']);
            this.contact.deleted.next(false);
          }, 1500);
        }
        if (this.currentObject.owner === 'group') {
          this.groups.deleteGroup(this.currentObject.element_id);
          this.contact.updateGroups(this.currentObject.element_id);
        }
      }
    }
    if ( value === 'edit') {
      this.modalEdit.nativeElement.style.display = 'none';
      if (this.editValue !== null && this.editValue !== '') {
        if (this.groups.checkIfGroupExist(this.editValue)) {
          this.groups.editGroupName(this.editValue, this.currentObject.element_id);
          this.contact.updateGroups(this.currentObject.element_id, this.editValue);
        }
      }
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
