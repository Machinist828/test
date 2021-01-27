import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USERS_LIST } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogged: any;
  isLoggedIn: boolean;
  constructor() { }

  login(username: string, password: string, router: Router) {
    const userFound = USERS_LIST.find(user => user.username === username && user.password === password);
    if(userFound) {
      this.userLogged = userFound;
      this.isLoggedIn = true;
      router.navigate(['/']);
    }
    else {
      alert('Invalid user');
    }
  }

  isUserLogged(): boolean {
    return this.isLoggedIn;
  }

  logout(router: Router) {
    this.isLoggedIn = false;
    this.userLogged = null;
    router.navigate(['/login']);
  }
}
