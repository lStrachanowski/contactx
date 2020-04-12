import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes = [
    {
      contact_id: 1,
      note_id: 1,
      text: 'Ma ładunki na z HU do DK 4.0 m szerokosci dobre stawki , ale delikatny towar.',
      date: '19.12.2019'
    },
    {
      contact_id: 1,
      note_id: 2,
      text: 'Projekt oddał komuś innemu , różnica w cenie 10%',
      date: '20.12.2019'
    },
    {
      contact_id: 2,
      note_id: 3,
      text: 'Głównie transport morski',
      date: '15.01.2018'
    },
    {
      contact_id: 2,
      note_id: 4,
      text: 'Gędą zlecenia na trasie z EE do PL pod warunkiem ,że ceny zostana zredukowane o 10%. Wtedy jest gwarancja projektu',
      date: '05.06.2018'
    },

  ];
  constructor() { }

   /*
 * Is searching for notes with given contact id
 * @param {number} id - Contact id
 */
  // searchNotes(id: number) {
  //   if ( this.notes.length > 0 ) {
  //     let resultsArray = [];
  //     let res  = Observable.create((observer) => {
  //       this.notes.forEach( element => {
  //         if (element.contact_id === id) {
  //           resultsArray.push(element);
  //         }
  //       });
  //       observer.next(resultsArray);
  //     });
  //     return res;
  //   } else {
  //     return null;
  //   }
  // }
  searchNotes(id: number) {
    if ( this.notes.length > 0 ) {
      let resultsArray = [];
      let res  = Observable.create((observer) => {
        resultsArray = this.notes.filter( (element) => {
           return element.contact_id === id;
          });
        observer.next(resultsArray);
      });
      return res;
    } else {
      return null;
    }
  }
}
