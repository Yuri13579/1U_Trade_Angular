import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {Location} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  [x: string]: any;

  currentHost = 'https://localhost:44307';
  //private tokenToShow = new BehaviorSubject(null);
  // getToken$ = this.tokenToShow.asObservable();
    getToken$ = this.token2;

  constructor(private http: HttpClient, router: Router, private location: Location) { }

  getToken(token: string) {
    console.warn('getToken', token);
   // this.tokenToShow.next(token);
    localStorage.setItem('currentUser', JSON.stringify({ token: token, name: name }));
  }

  getTokenFromlocalStorage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token; // your token
  }

  login(loginData) {
    return this.http.post(`${this.currentHost}/api/Account`, loginData);
  }

  logOut() {
    if (!this.location.isCurrentPathEqualTo('/login')) {
      this.tokenToShow.next(null);
      localStorage.setItem('currentUser', JSON.stringify({ token: null, name: name }));
      this.toasterService.pop('success', 'Your are now logged out');
      this.router.navigate(['/login']);
    }
  }



}
