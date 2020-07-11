import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-options',
  templateUrl: './settings-options.component.html',
  styleUrls: ['./settings-options.component.css']
})
export class SettingsOptionsComponent implements OnInit {

  email = false;
  pass = false;
  nick = false;
  constructor() { }

  ngOnInit() {
  }

  openTab(value: string) {
    if (value === 'email') {
      this.email = this.email ? false : true;
    }
    if (value === 'pass') {
      this.pass = this.pass ? false : true;
    }
    if (value === 'nick') {
      this.nick = this.nick ? false : true;
    }

  }
}
