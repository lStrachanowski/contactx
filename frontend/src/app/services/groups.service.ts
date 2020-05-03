import { Injectable } from '@angular/core';

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

  constructor() { }

  /*
  * Returns group names and contact ids for each group members.
  */
  getGroupsNames() {
    let groupNames = [];
    let results = [];
    this.groups.forEach( groupItem => {
      if (!groupNames.includes(groupItem.group_name)) {
        groupNames.push(groupItem.group_name);
        results.push({group_name: groupItem.group_name, group_members: [groupItem.contact_id]});
      } else {
          results.forEach(value => {
          if (value.group_name === groupItem.group_name ) {
            value.group_members.push(groupItem.contact_id);
          }
        });
      }
    });
    this.groupsSelectors = results;
    return results;
  }
}
