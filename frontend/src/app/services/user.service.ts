import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  loginStatius = false;

  /*
  Is holding currenct login status
  */
 private loginStatus = new BehaviorSubject<boolean>(this.loginStatius);
 currentLoginStatus = this.loginStatus.asObservable();

constructor( public router: Router) {
  if (Boolean(localStorage.getItem('dataSource'))) {
    if (localStorage.getItem('dataSource') === 'true') {
      this.loginStatius = true;
    } else {
      this.loginStatius = false;
    }
    this.loginStatus.next(this.loginStatius);
  }
}

  canActivate(): Promise<boolean>  {
    return new Promise( (resolve, reject) => {
      this.currentLoginStatus.subscribe( v => {
        if (v) {
          return resolve(true);
        } else {
          this.router.navigate(['/']);
          return resolve(false);
        }
      });
    });
  }

  setValue(value: boolean) {
    localStorage.clear();
    localStorage.setItem('dataSource', value.toString());
    this.loginStatius = value;
    this.loginStatus.next(this.loginStatius);
  }
}
