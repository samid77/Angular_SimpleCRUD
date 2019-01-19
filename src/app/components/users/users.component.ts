import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
  };
  users: User[];
  showExtended: Boolean = true;
  loaded: Boolean = false;
  enableAdd: Boolean = false;
  showUsersForm: Boolean = false;
  @ViewChild('userForm') form: any;
  data: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getData().subscribe(data => {
      console.log(data);
    });
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.loaded = true;
    });
  }
  addUser() {
    this.user.isActive = true;
    this.user.registered = new Date();
    this.users.unshift(this.user);

    this.user = {
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  onSubmit({value, valid}: {value: User, valid: Boolean}) {
    if (!valid) {
      console.log(`Form is not valid`);
    } else {
      value.isActive = true;
      value.registered = new Date();
      value.hide = true;

      this.userService.addUser(value);

      this.form.reset();
    }
  }

  fireEvent(e) {
    console.log(e.target.value);
    console.log(e.type);
  }
}
