import { Component, OnInit } from '@angular/core';
import {Params} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  userID = null;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( (params: Params) => {
      this.userID = params.id;
    });
  }

  ngOnInit() {
  }

}
