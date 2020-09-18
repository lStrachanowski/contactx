import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {HttpClient} from '@angular/common/http';
import { NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  selected = 'login';

  loginModel = {};
  registerModel = {};

  constructor(private user: UserService , private http: HttpClient) { }
  ngOnInit() {
  }

  loginClick() {
    this.selected = 'login';
  }

  registerClick() {
    this.selected = 'register';
  }

  onRegisterClick(form: NgForm) {
    if (form.value.email  &&  form.value.password && form.value.password_confirmation && form.value.user_name) {
      const uname = new FormControl(form.value.user_name , Validators.minLength(3));
      const uemail = new FormControl(form.value.email , Validators.email);
      const upass = new FormControl(form.value.password, Validators.minLength(8));
      const upassConfirmation = new FormControl(form.value.password_confirmation, Validators.minLength(8));
      this.registerModel = {uname : uname.valid, uemail : uemail.valid, upass : upass.valid , cpass: upassConfirmation.valid};
      if (uname.valid === true && uemail.valid === true && upass.valid === true && upassConfirmation.valid === true ) {
        if (form.value.password === form.value.password_confirmation) {
            this.http.post('http://127.0.0.1:5000/register', form.value).subscribe( response => {
            console.log(response);
          });
        }
      }
    }
  }

  onLoginClick(form: NgForm) {
    if (form.value.email  &&  form.value.password ) {
      const uemail = new FormControl(form.value.email , Validators.email);
      const upass = new FormControl(form.value.password, Validators.minLength(8));
      this.loginModel = {uemail : uemail.valid, cpass: upass.valid};
      if (uemail.valid && upass.valid) {
        this.http.post('http://127.0.0.1:5000/login', form.value).subscribe(response => {
          console.log(response);
        });
      } else {
        console.log('problem');
      }
    }
  }

}
