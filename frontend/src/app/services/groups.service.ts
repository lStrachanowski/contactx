import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups = [{
    contact_id: 1,
    group_name : 'Work'
  }, {
    contact_id: 2,
    group_name : 'Work',
  }, {
    contact_id: 3,
    group_name : 'Private',
  },
  {
    contact_id: 4,
    group_name : 'School',
  },
  {
    contact_id: 5,
    group_name : 'School',
  }
];

    /*
  Is holding currenct grouplist.
  */
 private groupsHolder = new BehaviorSubject<Array<any>>(this.groups);
 currentGroups = this.groupsHolder.asObservable();

  constructor() { }

  /*
  * Returns group names and contact ids for each group members.
  */
  getGroupsNames() {
    const noGroup = {group_name: 'Default', group_members: [], group_edit : false};
    const groupNames = [];
    const results = [];
    this.currentGroups.subscribe( groupsValues => {
      groupsValues.forEach(groupItem => {
        if (!groupNames.includes(groupItem.group_name) && groupItem.group_name !== null ) {
          groupNames.push(groupItem.group_name);
          results.push({group_name: groupItem.group_name, group_members: [groupItem.contact_id], group_edit : false});
        } else {
            results.forEach(value => {
            if (value.group_name === groupItem.group_name ) {
              value.group_members.push(groupItem.contact_id);
            }
          });
        }
      });
    });
    if (!groupNames.includes('Default')) {
      results.push(noGroup);
    }
    return results;
  }

  /*
  *Delete contact from contactslist.
  *@param {number} id - Contact id
  * */
  removeFromGroup(id: number) {
    const results = this.groups.filter( value => {
      if (value.contact_id !== id ) {
        return value;
      }
    });
    this.groups = results;
    this.groupsHolder.next(this.groups);
  }

  /*
  *Adds new contact to groups.
  *@param {number} id - Contact id
  *@param {string} group - group name
  **/
  addToGroup(id: number, group: string) {
    this.groups.push({contact_id: id , group_name: group });
    this.groupsHolder.next(this.groups);
  }

  /*
  *Delete group
  *@param {string} group - group name
  **/
  deleteGroup(group: string) {
    this.groups.forEach(value => {
      if (value.group_name === group) {
        value.group_name = 'Default';
      }
    });
    this.groupsHolder.next(this.groups);
  }
}
