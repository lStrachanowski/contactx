import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  show = false;
  constructor() { }

  ngOnInit() {
  }


  showPanel() {
    this.show = this.show === true ? false : true;
  }

}
