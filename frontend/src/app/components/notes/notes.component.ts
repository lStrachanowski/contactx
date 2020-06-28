import { Component, OnInit, Input } from '@angular/core';
import {Params} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from '../../services/notes.service';

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

  onDeleteNote(id: string) {
    this.notes.deleteNote(parseInt(id, 10), parseInt(this.userID, 10));
  }

  /*
  *Event after clicking ok in note form
  */
  onAddNote() {
    this.showForm = false;
    this.notes.onAddComment(this.text, parseInt(this.userID, 10));
  }

}
