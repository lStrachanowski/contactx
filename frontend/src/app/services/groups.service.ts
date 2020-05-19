import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups = [{
    group_id: 1,
    contact_id: 1,
    group_name : 'Work'
  }, {
    group_id: 1,
    contact_id: 2,
    group_name : 'Work',
  }, {
    group_id: 2,
    contact_id: 3,
    group_name : 'Private',
  },
  {
    group_id: 3,
    contact_id: 4,
    group_name : 'School',
  },
  {
    group_id: 3,
    contact_id: 5,
    group_name : 'School',
  }
];

groupsSelectors = [];

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
    const groupNames = [];
    const results = [];
    this.currentGroups.subscribe( groupsValues => {
      groupsValues.forEach(groupItem => {
        if (!groupNames.includes(groupItem.group_name)) {
          groupNames.push(groupItem.group_name);
          results.push({group_name: groupItem.group_name, group_members: [groupItem.contact_id], group_edit : false,
            group_id: groupItem.group_id});
        } else {
            results.forEach(value => {
            if (value.group_name === groupItem.group_name ) {
              value.group_members.push(groupItem.contact_id);
            }
          });
        }

      });
    });
    this.groupsSelectors = results;
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
}
