import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts = [
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
      group: 'work'
   },
   {
    vorname: 'Albert',
    name: 'Sosnowski-Krasikiewiczowicz',
    contact_id: 2,
    user_id: 'abc1',
    company: 'SPS ps.z o.o.',
    address: 'ul. Tysiąclecia 20 , 09-500 Warszawa',
    email: 'bbbbbbbbb@a.pl',
    phone: 520002553,
    mobile: 6060619191919,
    fax: 26126115615,
    other: null,
    group: 'work'
 },
 {
  vorname: 'Olga',
  name: 'Borys',
  contact_id: 3,
  user_id: 'abc1',
  company: null,
  address: 'Jesionowa 9/3a , 40-500 Zabrze',
  email: 'olga@wp.pl',
  phone: null,
  mobile: 6060619191919,
  fax: null,
  other: null,
  group: 'private'
}

  ];
  constructor() { }
  getContact() {
    return this.contacts;
  }
}
