import { Component, OnInit, Input,ViewChild } from '@angular/core';
import {Params} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from '../../services/notes.service';
import {ModalComponent} from '../../components/modal/modal.component';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  userID = null;
  notesData = null;
  showForm = false;
  text = '';
  @ViewChild('modalBox', {static: false}) modal: ModalComponent;
  constructor(private route: ActivatedRoute, private notes: NotesService) {
    this.route.params.subscribe( (params: Params) => {
      this.userID = params.id;
    });
    if (this.userID !== null) {
      this.notes.getNotes.subscribe(value => {
        this.notesData = this.notes.searchNotes(value, parseInt(this.userID, 10) );
      });
    }
  }

  ngOnInit() {
  }

  /*
  *Event after clicking add note button.
  */
  onAddButton() {
    this.showForm = this.showForm ? false : true;
  }

  /*
  *Event after clicking cancel in note form
  */
  onCancelNote() {
    this.showForm = false;
  }

  /*
  *Delete note
  * @param {number} id - contact id
  */
  onDeleteNote(id: string) {
    this.modal.openBox('note', {id: parseInt(id, 10), uid: parseInt(this.userID, 10)});
    // this.notes.deleteNote(parseInt(id, 10), parseInt(this.userID, 10));
  }

  /*
  *Edit note
  * @param {number} id - contact id
  */
  onEditNote(id: string) {
    this.text = this.notes.noteText(parseInt(id, 10), parseInt(this.userID, 10));
    this.notes.editNoteStatus(parseInt(id, 10), parseInt(this.userID, 10));
  }

  /*
  * Cancel clikc event for canceling note form
  * @param {number} id - contact id
  */
  cancelEdit(id: string) {
    this.notes.editNoteStatus(parseInt(id, 10), parseInt(this.userID, 10));
    this.text = null;
  }

  /*
  *Event after clicking ok in note form
  */
  onAddNote() {
    this.showForm = false;
    this.notes.onAddComment(this.text, parseInt(this.userID, 10));
    this.text = null;
  }


  /*
  * Add changed note to base
  * @param {number} id - contact id
  */
  onAddEditedNote(id: string) {
    this.notes.editNote(parseInt(id, 10), parseInt(this.userID, 10), this.text);
    this.notes.editNoteStatus(parseInt(id, 10), parseInt(this.userID, 10));
    this.text = null;
  }

}
