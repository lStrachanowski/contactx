import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {HttpClient } from '@angular/common/http';
import { NgForm, Validators, FormControl } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  selected = 'login';

  loginModel = {};
  registerModel = {};
  showForms = true;
  showRegisterMessage = false;
  loginWaiting = false;
  registerWaiting = false;
  formMessage = '';
  constructor(private user: UserService , private http: HttpClient, private cookieService: CookieService, private router: Router) { }
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
      const arePassordsTheSame = form.value.password === form.value.password_confirmation;
      this.registerModel = {uname : uname.valid, uemail : uemail.valid, upass : upass.valid , cpass: upassConfirmation.valid,
      theSamePass: arePassordsTheSame };
      this.registerWaiting = true;
      if (uname.valid === true && uemail.valid === true && upass.valid === true && upassConfirmation.valid === true ) {
        if (arePassordsTheSame) {
            this.http.post('http://127.0.0.1:5000/register', form.value).subscribe( response => {
            this.showForms = false;
            this.showRegisterMessage = true;
            this.registerWaiting = false;
          }, error => {
            this.showForms = false;
            this.formMessage = error.error.error;
            this.registerWaiting = false;
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
      this.loginWaiting = true;
      if (uemail.valid && upass.valid) {
          this.http.post('http://127.0.0.1:5000/login', form.value).subscribe(response => {
            const token = response[0].token;
            const expiration = response[0].expiration;
            this.cookieService.set('token', token );
            this.cookieService.set('expiration', expiration );
            this.user.setValue(true);
            this.loginWaiting = false;
            this.router.navigate(['/dashboard']);
          },
          error => {
            this.showForms = false;
            this.loginWaiting = false;
            this.formMessage = error.error.error;
            }
          );
      }
    }
  }
  returnToForm() {
    this.showForms = true;
  }

  goToLogin() {
    this.showForms = true;
    this.selected = 'login';
    this.showRegisterMessage = false;
  }

}
