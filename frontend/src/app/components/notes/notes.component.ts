import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private notes: NotesService) {
    this.route.params.subscribe( (params: Params) => {
      this.userID = params.id;
    });
    if (this.userID !== null) {
      this.notes.searchNotes(parseInt(this.userID, 10)).subscribe(val => {
        this.notesData = val;
        console.log(val);
      });
    }
  }

  ngOnInit() {
  }

}
