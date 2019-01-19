import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];
  data: Observable<any>;

  constructor() {
    this.users = [
      {
        firstName: 'Gomer',
        lastName: 'Simpson',
        email: 'gomer@gmail.com',
        isActive: true,
        registered: new Date('01/02/2018 08:30:00'),
        hide: true
      },
      {
        firstName: 'Homer',
        lastName: 'Simpson',
        email: 'homer@gmail.com',
        isActive: false,
        registered: new Date('08/07/2018 08:45:00'),
        hide: true
      },
      {
        firstName: 'Bomer',
        lastName: 'Simpson',
        email: 'bomer@gmail.com',
        isActive: true,
        registered: new Date('03/11/2018 06:20:00'),
        hide: true
      }
    ];
   }
  //  getUsers(): User[] {
  //   return this.users;
  //  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User) {
    this.users.unshift(user);
  }

  getData() {
    this.data = new Observable(observer => {
      setTimeout(() => {
        observer.next(1);
      }, 1000);

      setTimeout(() => {
        observer.next(2);
      }, 2000);

      setTimeout(() => {
        observer.next(3);
      }, 3000);

      setTimeout(() => {
        observer.next({name: 'Dimas'});
      }, 4000);
    });

    return this.data;
  }

}
