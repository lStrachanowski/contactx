import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  selected = 'login';
  constructor(private user: UserService , private http: HttpClient) { }
  ngOnInit() {
  }

  loginClick() {
    this.selected = 'login';
  }

  registerClick() {
    this.selected = 'register';
  }

  logInButton() {
    this.user.setValue(true);
  }

  onRegisterClick(form: NgForm) {
    this.http.post('http://127.0.0.1:5000/register', form.value).subscribe( response => {
      console.log(response);
    });
  }

}
