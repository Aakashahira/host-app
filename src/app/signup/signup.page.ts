import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  gender = "male"
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private authSerive : AuthService,private router : Router) { }

  ngOnInit() {
  }
  signUpForm = new FormGroup({
    fullName : new FormControl(null),
    email : new FormControl(null),
    password : new FormControl(null),
    gender : new FormControl(null),
    date : new FormControl(null),
    city : new FormControl(null),
    address : new FormControl(null),
    mobileNo : new FormControl(null)
  });


  onSubmit()
  {
    this.signUpForm.get('gender').setValue((this.gender));
    this.authSerive.createUser(this.signUpForm)
   console.log(this.signUpForm.value);
  }
  selectGender(g : string)
  {
    this.gender = g;
    console.log(g);
  }
  male()
  {
    if(this.gender == 'male')
    {
   return{ 'setBgg' : true}
    }
    else {
      return {'setBg2' : true}
    }
  }
  female()
  {
    if(this.gender == 'female')
    {
   return{ 'setBgg' : true}
    }
    else {
      return {'setBg2' : true}
    }
   }

   gotoLogin()
   {
     this.router.navigateByUrl('user-login');
   }  
}
