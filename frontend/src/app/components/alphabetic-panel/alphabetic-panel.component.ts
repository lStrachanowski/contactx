import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alphabetic-panel',
  templateUrl: './alphabetic-panel.component.html',
  styleUrls: ['./alphabetic-panel.component.css']
})
export class AlphabeticPanelComponent implements OnInit {
  letters = 'abcdefghijklmnopqrstuvwxyz';
  lettersArray = this.letters.split('');
  show = false;
  constructor() { }

  ngOnInit() {
  }

  showPanel() {
    this.show = this.show === true ? false : true;
  }

}
