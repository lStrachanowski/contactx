import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalComponent} from '../../components/modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('modalBox', {static: false}) modal: ModalComponent;
  constructor() { }

  ngOnInit() {
  }

  openDialog() {
    this.modal.openBox('logout');
  }

}
