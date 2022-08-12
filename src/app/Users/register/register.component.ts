import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  registerUsers: any = [];
  currentDateTime: any;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userId: new FormControl(this.currentDateTime),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      department: new FormControl('it'),
      mobile: new FormControl('0123456789', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      gender: new FormControl('male'),
    });

    console.log('from ls', localStorage.getItem('storedRregisterUsersData'));
    let users: any = localStorage.getItem('storedRregisterUsersData');
    this.registerUsers = JSON.parse(users);
    console.log('from ls', this.registerUsers);
  }

  get m() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log('Register Form-', this.registerForm);
    console.log('Register Form Value', this.registerForm.value);
    console.log('array', this.registerUsers);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      // return;
      console.log('registerForm.invalid');
      // alert('form not valid');
    } else {
      this.generateSessionId();
      this.registerForm.patchValue({
        userId: this.currentDateTime,
      });
      console.log('Register Form Value', this.registerForm.value);
      console.log('registerForm.valid');
      console.log(this.registerUsers);
      if (this.registerUsers) {
        console.log('registerUsers.notnull');
        this.registerUsers.push(this.registerForm.value);
        console.log(this.registerUsers);
        localStorage.setItem(
          'storedRregisterUsersData',
          JSON.stringify(this.registerUsers)
        );
      } else {
        console.log('registerUsers.null');
        this.registerUsers = [];
        this.registerUsers.push(this.registerForm.value);
        localStorage.setItem(
          'storedRregisterUsersData',
          JSON.stringify(this.registerUsers)
        );
      }

      this._router.navigate(['/userList']);
      this.registerForm.reset();
    }
  }

  // go to userlist page
  goToUserList() {
    this._router.navigate(['userList']);
  }

  // generate current date time stamp
  generateSessionId(): void {
    let month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    let date = new Date().getDate().toString().padStart(2, '0');
    let year = new Date().getFullYear();
    let hours = new Date().getHours().toString().padStart(2, '0');
    let minutes = new Date().getMinutes().toString().padStart(2, '0');
    let seconds = new Date().getSeconds().toString().padStart(2, '0');
    let milliseconds = new Date().getMilliseconds().toString().padStart(3, '0');
    this.currentDateTime = `${date}${month}${year}${hours}${minutes}${seconds}${milliseconds}`;
    // alert(this.currentDateTime);
  }
}
