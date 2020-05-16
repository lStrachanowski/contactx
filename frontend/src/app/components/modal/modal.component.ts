import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('modalContainerEdit', {static: false}) modalEdit: ElementRef;
  @ViewChild('modalContainerDelete', {static: false}) modalDelete: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  /*
 * Is trigering proper modal depending on parameter.
 * @param {string} value - modal type
 */
  openBox(value: string) {
    if (value === 'delete') {
      this.modalDelete.nativeElement.style.display = 'flex';
    }
    if ( value === 'edit') {
      this.modalEdit.nativeElement.style.display = 'flex';
    }
  }

  /*
 * Ok action for modal depending on parameter.
 * @param {string} value - modal type
 */
  okClick(value: string) {
    if (value === 'delete') {
      this.modalDelete.nativeElement.style.display = 'none';
    }
    if ( value === 'edit') {
      this.modalEdit.nativeElement.style.display = 'none';
    }
  }

/*
 * Cancel action for modal depending on parameter.
 * @param {string} value - modal type
 */
  cancelClick(value: string) {
    if (value === 'delete') {
      this.modalDelete.nativeElement.style.display = 'none';
    }
    if ( value === 'edit') {
      this.modalEdit.nativeElement.style.display = 'none';
    }
  }

}
