import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  /*
  Is holding add note button status.
  */
  private statusSource = new BehaviorSubject<boolean>(false);
  currentStatus = this.statusSource.asObservable();

  /*
  Notes array.
  */
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
  * Is switching status to true or false , which is showing or hiding nottes form.
  * @param {boolean} status - show or hide form
  */

  changeStatus(status: boolean) {
    this.statusSource.next(status);
  }

  /*
  * Is searching for notes with given user id
  * @param {number} id - contact id
  */

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
