import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GroupsService} from '../../services/groups.service';
import {ContactsService} from '../../services/contacts.service';
import {ModalComponent} from '../../components/modal/modal.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  show = false;
  selected = false;
  groupList = [];
  selectedGroupName = null;


  @ViewChild('modalBox', {static: false}) modal: ModalComponent;
  constructor(private groups: GroupsService, private contact: ContactsService) { }

  ngOnInit() {
    this.groups.currentGroups.subscribe( value => {
      this.groupList = this.groups.getGroupsNames();
    });
    this.selectedGroupName = this.contact.currentGroup;
    if (this.selectedGroupName !== null ) {
      this.selected = true;
    }
  }


  /*
  * Is showing/hiding group panel.
  */
  showPanel() {
    this.show = this.show === true ? false : true;
  }

  /*
  *Shows contacts , which are assigned to clicked group.
  */
  groupClick(group: Array<number>, groupName: string) {
    this.contact.filterGroupMembers(groupName, group);
    if (groupName === this.contact.currentGroup) {
      this.selected = true;
      this.selectedGroupName = groupName;
      this.contact.currentGroup = groupName;
    } else {
      this.selected = false;
      this.selectedGroupName = false;
    }
  }

  /*
 * Is togling group edit status for clicked group.
 * @param {string} groupName - group name
 */
  editGroupOptions(groupName: string) {
    this.groupList.filter(value => {
      if (groupName === value.group_name) {
        value.group_edit = value.group_edit === true ? false : true;
      }
    });
  }

  /*
  * Trigers edit dialog box.
  */
  editClick() {
    this.modal.openBox('edit');
  }

    /*
  * Trigers delete confirmation box.
  * @param {string} element - element type.
  * @param {string} groupName - group name.
  */
 deleteClick(elementValue: string, groupName: string) {
  this.modal.openBox('delete', {element: elementValue, element_id: groupName, owner: 'group'});
}

}
