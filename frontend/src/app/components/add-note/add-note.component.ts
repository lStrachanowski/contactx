import { Component, OnInit} from '@angular/core';
import {NotesService} from '../../services/notes.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {


  constructor(private notes: NotesService) { }

  ngOnInit() {
  }

  /*
  * After adding coment is sending statuse fasle
  */
  onAddNote() {
   this.notes.changeStatus(false);
  }

  /*
  * After adding coment is sending statuse fasle
  */
  onCancelNote() {
    this.notes.changeStatus(false);
  }

}
