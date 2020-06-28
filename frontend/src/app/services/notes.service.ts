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
      note_id: 1,
      text: 'Głównie transport morski',
      date: '15.01.2018'
    },
    {
      contact_id: 2,
      note_id: 2,
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
    const today = new Date();
    const comment = {
      contact_id: id,
      note_id: this.generateNoteId(id),
      text: value,
      date: today.toLocaleDateString()
    };
    this.notes.push(comment);
    this.currentNontes.next(this.notes);
  }

  /*
  * Generating note id.
  * @param {number} id - contact id
  */
  generateNoteId(id: number) {
    let temp = 0;
    for ( const val of this.notes) {
      if (val.contact_id === id) {
        if ( temp < val.note_id) {
          temp = val.note_id;
        }
      }
    }
    return temp + 1;
  }

  /*
  * Delete note
  * @param {number} id - contact id
  * @param {number} uid - user id
  */
  deleteNote(id: number, uid: number) {
    const results = this.notes.filter(value => {
      if (value.contact_id === uid && value.note_id === id) {
      } else {
        return value;
      }
    });
    this.notes = results;
    this.currentNontes.next(results);
  }
}
