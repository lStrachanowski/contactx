import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  title = 'contactx';
  showMenu = false;
  constructor() { }

  ngOnInit() {
  }

  showMenuClick() {
    this.showMenu = this.showMenu === true ? false : true;
  }

}
