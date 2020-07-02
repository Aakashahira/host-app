import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {

  hide = true;
  constructor(public service : AuthService,private router : Router) { }

  ngOnInit() {
  }
  loginForm = new FormGroup({
    email : new FormControl(null),
    password : new FormControl(null)
  })
  onSubmit()
  {
    console.log(this.loginForm.value);
    this.service.loginUser2(this.loginForm.value.email,this.loginForm.value.password);
  }
  gotoSignUp()
  {
     this.router.navigateByUrl('signup');
  }
}
