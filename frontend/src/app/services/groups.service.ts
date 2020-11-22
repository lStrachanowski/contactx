import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GroupsService {

  groups = [];

    /*
  Is holding currenct grouplist.
  */
 private groupsHolder = new BehaviorSubject<Array<any>>(this.groups);
 currentGroups = this.groupsHolder.asObservable();
 groupsData = null;
  constructor() { }

  /*Initialize data received from server.
  * @param {Array<Object>} groupList - list with groups
  */
  initializeGroups(groupList) {
    this.groups = [];
    for (const value of groupList) {
      value.group_edit = value.group_edit === 'false' ? false : true;
      this.groups.push(value);
    }
    this.groupsHolder.next(this.groups);
  }

  /*
  * Returns group names and contact ids for each group members.
  */
  getGroupsNames() {
    this.currentGroups.subscribe( value => {
      this.groupsData = value;
    });
    return this.groupsData;
  }

  /*
  *Delete contact from contactslist.
  *@param {number} id - Contact id
  * */
  removeFromGroup(id: number) {
    for (const value of this.groups) {
      if (value.group_members.includes(id)) {
        value.group_members = value.group_members.filter( num => {
          if ( num !== id) {
            return num;
          }
      });
    }
      this.groupsHolder.next(this.groups);
    }
  }
  /*
  *Adds new contact to groups.
  *@param {number} id - Contact id
  *@param {string} group - group name
  **/
  addToGroup(id: number, group: string) {
    for ( const value of this.groups) {
      if (value.group_name === group) {
        value.group_members.push(id);
      }
    }
    this.groupsHolder.next(this.groups);
  }

  /*
  *Delete group
  *@param {string} group - group name
  **/
  deleteGroup(group: string) {
  const results = [];
  let tempGroupMembers = [];
  for ( const value  of this.groups ) {
    if (value.group_name !== group) {
      results.push(value);
    } else {
      tempGroupMembers = value.group_members;
    }
  }
  this.groups = results;
  this.groupsHolder.next(results);
  for ( const value  of this.groups ) {
    if (value.group_name === 'Default') {
       value.group_members.push(...tempGroupMembers);
    }
  }
  this.groupsHolder.next(this.groups);
  }

  /*
  *Group rename
  *@param {string} group - new group name
  *@param {string} currentGroup - current group name
  **/
  editGroupName(group: string, currentGroup: string) {
    for ( const g of this.groups) {
      if ( g.group_name === currentGroup) {
        g.group_name = group;
      }
    }
    this.groupsHolder.next(this.groups);
  }

  /*
  *Checks if group with given name already exist in db
  *@param {string} group - group name
  **/
  checkIfGroupExist(group: string) {
    for (const g of this.groups) {
      if (g.group_name === group) {
        return false;
        }
      }
    return true;
    }

  /*
  *Adds new group to group array
  *@param {string} groupName - group name
  **/
    addGroup(groupName: string) {
      this.groups.push({group_members: [], group_name : groupName , group_edit : false});
    }

    // extractGroupsData(){

    // }
}
