import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  login = false;

    /*
  Is holding currenct login status
  */
 private loginStatus = new BehaviorSubject<boolean>(this.login);
 currentLoginStatus = this.loginStatus.asObservable();

constructor() { }
}
