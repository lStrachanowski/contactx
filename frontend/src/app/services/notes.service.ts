import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

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

  private currentNontes = new BehaviorSubject<Array<any>>(this.notes);
  getNotes = this.currentNontes.asObservable();

  constructor() { }

  /*
  * Is searching for notes with given user id
  * @param {number} id - contact id
  * @param {any} arr - contactlist array , which will be filtred
  */

  searchNotes(arr: any, id: number) {
    if ( arr.length > 0 ) {
      let resultsArray = [];
      resultsArray = arr.filter( (element) => {
            return element.contact_id === id;
      });
      return resultsArray;
    } else {
      return null;
    }
  }

  /*
  * Adding comment to array
  * @param {string} value - comment, which will be added to array.
  * @param {number} id - contact id
  */
  onAddComment(value: string, id: number) {
    const comment = {
      contact_id: id,
      note_id: 40,
      text: value,
      date: '05.06.2018'
    };
    this.notes.push(comment);
    this.currentNontes.next(this.notes);
  }
}
