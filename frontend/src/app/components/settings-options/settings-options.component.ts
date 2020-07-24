import { Component, OnInit } from '@angular/core';
import {NgForm, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-options',
  templateUrl: './settings-options.component.html',
  styleUrls: ['./settings-options.component.css']
})
export class SettingsOptionsComponent implements OnInit {

  email = false;
  pass = false;
  nick = false;
  model = {};
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

  /*
  * Gets data from email change form.
  * @param {NgForm} form - form data
  */
  onSubmitEmailChange(form: NgForm) {
    if (form.value.oldEmail  &&  form.value.newEmail && form.value.passEmailChange) {
      const uemail = new FormControl(form.value.oldEmail , Validators.email);
      const newEmail = new FormControl(form.value.newEmail , Validators.email);
      const upass = new FormControl(form.value.passEmailChange, Validators.minLength(8));
      this.model = {uemail : uemail.valid, nemail: newEmail.valid, cpass: upass.valid};
      console.log(this.model);
    }
  }

   /*
  * Gets data from password change form.
  * @param {NgForm} form - form data
  */
  onSubmitPassChange(form: NgForm) {
    if (form.value.oldPass  &&  form.value.newPass && form.value.newPassConfirmation) {
      const oldPass = new FormControl(form.value.oldPass , Validators.minLength(8));
      const newPass = new FormControl(form.value.newPass , Validators.minLength(8));
      const newPassConfirmation = new FormControl(form.value.newPassConfirmation, Validators.minLength(8));
      this.model = {opass : oldPass.valid, npass: newPass.valid, cnpass: newPassConfirmation.valid};
      console.log(this.model);
    }
  }

   /*
  * Gets data from nick change form.
  * @param {NgForm} form - form data
  */
  onSubmitNickChange(form: NgForm) {
    if (form.value.oldNick  &&  form.value.newNick && form.value.pass) {
      const oldNick = new FormControl(form.value.oldNick , Validators.minLength(1));
      const newNick = new FormControl(form.value.newNick , Validators.minLength(1));
      const pass = new FormControl(form.value.pass, Validators.minLength(8));
      this.model = {onick : oldNick.valid, nnick: newNick.valid, upass: pass.valid};
      console.log(this.model);
    }
  }
}
