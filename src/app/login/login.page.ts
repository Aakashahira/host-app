import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    this.service.loginUser(this.loginForm.value.email,this.loginForm.value.password);
  }
  gotoSignUp()
  {
     this.router.navigateByUrl('signup2');
  }
  
}
