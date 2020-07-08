import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {Router} from '@angular/router';
import {GroupsService} from '../../services/groups.service';
import {NotesService} from '../../services/notes.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  deleted = false;
  currentObject = null;
  editValue = null;
  newGroupName = null;
  alertMessage = '';
  @ViewChild('modalContainerEdit', {static: false}) modalEdit: ElementRef;
  @ViewChild('modalContainerDelete', {static: false}) modalDelete: ElementRef;
  @ViewChild('modalContainerAlert', {static: false}) modalAlert: ElementRef;
  @ViewChild('modalContainerAdd', {static: false}) modalAdd: ElementRef;
  @ViewChild('modalContainerLogOut', {static: false}) modalLogOut: ElementRef;
  @ViewChild('modalContainerNote', {static: false}) modalNote: ElementRef;
  constructor(private contact: ContactsService, private route: Router, private groups: GroupsService, private notes: NotesService) { }

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
    if ( value === 'add') {
      this.modalAdd.nativeElement.style.display = 'flex';
    }
    if (value === 'logout') {
      this.modalLogOut.nativeElement.style.display = 'flex';
    }
    if ( value === 'note') {
      this.modalNote.nativeElement.style.display = 'flex';
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
          this.alertMessage = 'Group deleted.';
          this.modalAlert.nativeElement.style.display = 'flex';
        }
      }
    }
    if ( value === 'edit') {
      this.modalEdit.nativeElement.style.display = 'none';
      if (this.editValue.trim() !== null && this.editValue.trim() !== '') {
        if (this.groups.checkIfGroupExist(this.editValue.trim())) {
          this.groups.editGroupName(this.editValue.trim(), this.currentObject.element_id);
          this.contact.updateGroups(this.currentObject.element_id, this.editValue.trim());
        } else {
          this.alertMessage = 'Group with this name already exist.Please use another group name';
          this.modalAlert.nativeElement.style.display = 'flex';
        }
      }
    }
    if ( value === 'alert') {
      this.modalAlert.nativeElement.style.display = 'none';
    }
    if ( value === 'add') {
      if (this.newGroupName.trim() !== null && this.newGroupName.trim() !== '') {
        if (this.groups.checkIfGroupExist(this.newGroupName.trim())) {
          this.groups.addGroup(this.newGroupName);
          this.newGroupName = '';
          this.modalAdd.nativeElement.style.display = 'none';
        } else {
          this.alertMessage = 'Group with this name already exist. Please use another group name';
          this.modalAlert.nativeElement.style.display = 'flex';
        }
      }
    }
    if ( value === 'logOut') {
      this.modalLogOut.nativeElement.style.display = 'none';
      this.route.navigate(['/']);
    }
    if ( value === 'note') {
      this.modalNote.nativeElement.style.display = 'none';
      this.notes.deleteNote(this.currentObject.id, this.currentObject.uid);
      this.alertMessage = 'Note deleted';
      this.modalAlert.nativeElement.style.display = 'flex';
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
    if ( value === 'add') {
      this.modalAdd.nativeElement.style.display = 'none';
    }
    if ( value === 'logOut') {
      this.modalLogOut.nativeElement.style.display = 'none';
    }
    if ( value === 'note') {
      this.modalNote.nativeElement.style.display = 'none';
    }
  }

}
