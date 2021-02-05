import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { GroupsService} from '../services/groups.service';
import {NgForm} from '@angular/forms';
import { not } from '@angular/compiler/src/output/output_ast';
import {HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts = [];

    /*
  Is holding currenct contactlist.
  */
  private contactsHolder = new BehaviorSubject<Array<any>>(this.contacts);
  currentContacts = this.contactsHolder.asObservable();

  /*
  *Is holding current selected group name.
  */
  currentGroup = null;
  constructor(private groups: GroupsService, private http: HttpClient, private cookieService: CookieService) {}

  /*
  Is holding currenct contactlist size;
  */
  contactCounter = new BehaviorSubject<number>(this.contacts.length);
  /*
  Is holding currenct contact delete status;
  */
  deleted = new BehaviorSubject<boolean>(false);

  /*
  * Holds letter click status;
  */
  letterClicked = false;
  /*
  * Is setting current selected group name and filternig members which belongs to this group.
  *@param {Array<number>} group  - Array with contact ids for particular group members
  *@param {string} groupName - current group name
  */
  filterGroupMembers(groupName: string, group?: Array<number>) {
    const filterResults = [];
    if (groupName !== this.currentGroup) {
      if ( group.length > 0) {
        this.contacts.filter( value => {
          if (group.includes(value.contact_id)) {
            filterResults.push(value);
          }
        });
      }
      this.contactsHolder.next(filterResults);
      this.currentGroup = groupName;
    } else {
      if (!group && this.currentGroup !== null) {
      /*
      * Refreshing list when group was selected during deleting the contact.
      */
        let newSelectedItems = null;
        this.contactsHolder.subscribe( contacts => {
          newSelectedItems = contacts.filter( item => {
              if (item.group === this.currentGroup) {
                return item;
              }
          });
        });
        this.contactsHolder.next(newSelectedItems);
      } else {
        this.currentGroup = null;
        this.contactsHolder.next(this.contacts);
      }
    }
  }

  /*
  Initialize data received from server.
  * @param {Array<Object>} contactList - list with contacts
  */
  initializeData(contactList) {
    this.contacts = [];
    for (const e of contactList) {
      e.edit = e.edit === 'false' ? false : true;
      this.contacts.push(e);
    }
    this.contactsHolder.next(this.contacts);
    this.contactCounter.next(this.contacts.length);
    this.filterGroupMembers(this.currentGroup);
  }

  /*
 * Is searching for contact with given id
 * @param {number} id - Contact id
 */
  searchContactId(id: number) {
    if (this.contacts.length > 0) {
      const res = Observable.create((observer) => {
        this.contacts.filter((element) => {
          if (element.contact_id === id) {
            observer.next(element);
          }
        });
      });
      return res;
    } else {
      return null;
    }
  }

  /*
  *Returning true when contact selected, for search results items.
  *@param {number} id - Contact id
  * */
  contactEdit(id: number) {
    this.contacts.filter((element) => {
      if (element.contact_id === id) {
        element.edit = element.edit ? false : true ;
      }
    });
  }

    /*
  *Delete contact from contactslist.
  *@param {number} id - Contact id
  * */
  deleteContact(id: number) {
    const cookieToken = this.cookieService.get('token');
    this.contacts = this.contacts.filter( value => {
      if ( value.contact_id !== id) {
        return value;
      }
    });
    this.contactsHolder.next(this.contacts);
    this.filterGroupMembers(this.currentGroup);
    this.groups.removeFromGroup(id);
    this.contactCounter.next(this.contacts.length);
    this.http.post('http://127.0.0.1:5000/deletecontact', { contactId : id, token : cookieToken }).subscribe(res => {
    }, err => {
      console.log('error while deleting');
    });
  }

  /*
  *Adds new contact to contactlist
  *@param {NgForm} form - form with contact details.
  **/
  addContact(form: NgForm) {
    const newContact = {
      vorname: form.value.vorname,
      name: form.value.name,
      contact_id: form.value.id,
      user_id: '',
      company: form.value.company,
      address: form.value.address,
      email: form.value.email,
      phone: form.value.phone,
      mobile: form.value.mobile,
      fax: form.value.fax,
      other: form.value.other,
      group: form.value.group_select,
      edit: false
   };
    if (form.form.value.group_select === 'Default' || form.form.value.group_select === '' ) {
      newContact.group = 'Default';
    }

    this.contacts.push(newContact);
    this.contactsHolder.next(this.contacts);
    this.groups.addToGroup(newContact.contact_id, newContact.group);
    this.filterGroupMembers(this.currentGroup);
    this.contactCounter.next(this.contacts.length);
  }

  /*
  *Geneartes contact id.
  */
  generateId() {
    let temp = 0;
    this.contacts.forEach(value => {
      if (value.contact_id > temp) {
        temp = value.contact_id;
      }
    });
    return temp + 1;
  }

   /*
  *Updating contact at contactslist.
  *@param {number} id - Contact id
  *@param {NgForm} form - form with contact details.
  * */
  updateContact(id: number, form: NgForm) {
    this.contacts.filter(value => {
      if ( value.contact_id === id) {
        value.vorname = form.value.vorname;
        value.name = form.value.name;
        value.company = form.value.company;
        value.address = form.value.address;
        value.email = form.value.email;
        value.phone = form.value.phone;
        value.mobile = form.value.mobile;
        value.fax = form.value.fax;
        value.other = form.value.other;
        value.group = form.value.group_select;
        this.contactsHolder.next(this.contacts);
      }
    });
  }

  /*
  *Updates group value after group deletion
  *@param {string} group - group name
  **/
  updateGroups(group: string, newGroupName?: string) {
    this.contacts.forEach( value => {
      if (value.group === group && newGroupName === undefined) {
        value.group = 'Default';
      }
      if (value.group === group && newGroupName ) {
        value.group = newGroupName;
      }
    });
    this.contactsHolder.next(this.contacts);
  }

  /*
  * Returns contacts vorename starting with given letter
  *@param {string} letter - name first contact letter
  */
  contactByLetter(letter: string) {
    const temp = [];
    this.contacts.forEach(value => {
      if ( value.name[0].toLocaleLowerCase() === letter ) {
        temp.push(value);
      }
    });
    this.contactsHolder.next(temp);
    this.letterClicked = this.letterClicked === true ? false : true;
    if ( this.letterClicked === false) {
      this.contactsHolder.next(this.contacts);
    }
  }

  /*
  *Is searching given value in contact list
  *@param {string} searchValue - contact to search
  **/
  contactSearch(searchValue: string) {

    const temp = [];
    if (this.currentGroup === null || this.currentGroup === 'Default') {
      for (const val in this.contacts) {
        if (this.contacts[val].company) {
          if (this.contacts[val].company.toLowerCase().includes(searchValue.toLowerCase()) ||
          this.contacts[val].name.toLowerCase().includes(searchValue.toLowerCase()) ||
          this.contacts[val].vorname.toLowerCase().includes(searchValue.toLowerCase())) {
          temp.push(this.contacts[val]);
          }
        } else {
          if (this.contacts[val].name.toLowerCase().includes(searchValue.toLowerCase()) ||
          this.contacts[val].vorname.toLowerCase().includes(searchValue.toLowerCase())) {
          temp.push(this.contacts[val]);
          }
        }
      }
    } else {
      for (const val in this.contacts) {
        if (this.contacts[val].company) {
          if ((this.contacts[val].company.toLowerCase().includes(searchValue.toLowerCase()) ||
          this.contacts[val].name.toLowerCase().includes(searchValue.toLowerCase()) ||
          this.contacts[val].vorname.toLowerCase().includes(searchValue.toLowerCase()))
          && this.currentGroup === this.contacts[val].group ) {
          temp.push(this.contacts[val]);
          }
        } else {
          if ((this.contacts[val].name.toLowerCase().includes(searchValue.toLowerCase()) ||
          this.contacts[val].vorname.toLowerCase().includes(searchValue.toLowerCase())) &&
          this.currentGroup === this.contacts[val].group ) {
          temp.push(this.contacts[val]);
          }
        }
      }
    }
    this.contactsHolder.next(temp);
  }
}
