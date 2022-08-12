import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  users: any = [];
  constructor(private _router: Router) {}

  ngOnInit(): void {
    let users: any = localStorage.getItem('storedRregisterUsersData');
    this.users = JSON.parse(users);
    console.log('this.users', this.users);
  }
  goToRegister() {
    this._router.navigate(['/register']);
  }
}
