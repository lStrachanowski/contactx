import { Component, OnInit } from '@angular/core';
import { GroupsService} from '../../services/groups.service';
import {ContactsService} from '../../services/contacts.service';
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
  constructor(private groups: GroupsService, private contact: ContactsService) { }

  ngOnInit() {
    this.groupList = this.groups.getGroupsNames();
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
    this.contact.filterGroupMembers(group, groupName);
    if (groupName === this.contact.currentGroup) {
      this.selected = true;
      this.selectedGroupName = groupName;
      this.contact.currentGroup = groupName;
    } else {
      this.selected = false;
      this.selectedGroupName = false;
    }
  }


}
