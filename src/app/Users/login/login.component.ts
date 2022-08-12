import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: string | undefined;
  password!: number;
  storedData: any;
  isUserNameMatch: boolean = true;
  loginForm!: FormGroup;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    let loginDtls = {
      userName: 'jaisurya@gmail.com',
      password: 'jaisurya@123',
    };
    localStorage.setItem('loginData', JSON.stringify(loginDtls));

    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);

    const { userName, password } = this.loginForm.value;
    this.userName = userName;
    this.password = password;

    if (this.loginForm.valid) {
      // let logObj: any = localStorage.getItem('loginData');
      // this.storedData = JSON.parse(logObj);
      // console.log(this.storedData);
      // if (this.storedData.userName === userName) {
      //   alert('matched');
      // } else {
      //   alert('not matched');
      // }

      if (
        this.loginForm.value.userName === 'surya' &&
        this.loginForm.value.password === '123'
      ) {
        this._router.navigate(['/register']);
      } else {
        this.isUserNameMatch = false;
        this.loginForm.reset();
        console.log(this.loginForm);
        setTimeout(() => {
          this.isUserNameMatch = true;
        }, 1500);
        // if (this.loginForm.invalid) {
        //   this.isUserNameMatch = true;
        // }
      }
    }
  }
}
