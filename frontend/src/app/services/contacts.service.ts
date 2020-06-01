import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { GroupsService} from '../services/groups.service';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts = [
    {
      vorname: 'Lukasz',
      name: 'Strach',
      contact_id: 1,
      user_id: 'abc1',
      company: 'Pol Transport and Forwarding sp. z o.o. sp. k',
      address: 'ul. Bla bla 4 , 40-400 Katowice',
      email: 'a@a.pl',
      phone: 323523254,
      mobile: 609900999995,
      fax: 222222222,
      other: 'Senior Executive at this company',
      group: 'Work',
      edit: false
   },
   {
    vorname: 'Albert',
    name: 'Sosnowski-Krasikiewiczowicz',
    contact_id: 2,
    user_id: 'abc2',
    company: 'SPS ps.z o.o.',
    address: 'ul. Tysiąclecia 20 , 09-500 Warszawa',
    email: 'bbbbbbbbb@a.pl',
    phone: 520002553,
    mobile: 6060619191919,
    fax: 26126115615,
    other: null,
    group: 'Work',
    edit: false
 },
 {
  vorname: 'Olga',
  name: 'Borys',
  contact_id: 3,
  user_id: 'abc3',
  company: null,
  address: 'Jesionowa 9/3a , 40-500 Zabrze',
  email: 'olga@wp.pl',
  phone: null,
  mobile: 6060619191919,
  fax: null,
  other: null,
  group: 'Private',
  edit: false
},
{
  vorname: 'Tom',
  name: 'Koks',
  contact_id: 4,
  user_id: 'abc4',
  company: null,
  address: 'Bruksela EU street 4',
  email: null,
  phone: null,
  mobile: 49992418408,
  fax: null,
  other: null,
  group: 'School',
  edit: false
},
{
  vorname: 'Ala',
  name: 'Kowalska',
  contact_id: 5,
  user_id: 'abc5',
  company: null,
  address: null,
  email: null,
  phone: null,
  mobile: 56262549488,
  fax: null,
  other: null,
  group: 'School',
  edit: false
}

  ];

    /*
  Is holding currenct contactlist.
  */
  private contactsHolder = new BehaviorSubject<Array<any>>(this.contacts);
  currentContacts = this.contactsHolder.asObservable();

  /*
  *Is holding current selected group name.
  */
  currentGroup = null;
  constructor(private groups: GroupsService) {}

  /*
  Is holding currenct contactlist size;
  */
  contactCounter = new BehaviorSubject<number>(this.contacts.length);
  /*
  Is holding currenct contact delete status;
  */
  deleted = new BehaviorSubject<boolean>(false);
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
    this.contacts = this.contacts.filter( value => {
      if ( value.contact_id !== id) {
        return value;
      }
    });
    this.contactsHolder.next(this.contacts);
    this.filterGroupMembers(this.currentGroup);
    this.groups.removeFromGroup(id);
    this.contactCounter.next(this.contacts.length);
  }

  /*
  *Adds new contact to contactlist
  *@param {NgForm} form - form with contact details.
  **/
  addContact(form: NgForm) {
    const newContact = {
      vorname: form.value.vorname,
      name: form.value.name,
      contact_id: this.generateId(),
      user_id: 'abc1',
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
    this.contacts.push(newContact);
    this.contactsHolder.next(this.contacts);
    this.groups.addToGroup(newContact.contact_id, newContact.group);
    this.filterGroupMembers(this.currentGroup);
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
}
