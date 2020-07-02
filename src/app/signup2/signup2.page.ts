import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.page.html',
  styleUrls: ['./signup2.page.scss'],
})
export class Signup2Page implements OnInit {

   hide = true;
  constructor(private service : AuthService, private router : Router) {
    this.signUpForm.get('mobileNo').setValue("+27");
   }

  ngOnInit() {
    this.signUpForm.get('mobileNo').setValue("+27");
  }
  signUpForm = new FormGroup({
    fullName : new FormControl(null),
    companyName : new FormControl(null),
    email : new FormControl(null),
    password : new FormControl(null),
    serviceType : new FormControl(null),
    city : new FormControl(null),
    address : new FormControl(null),
    mobileNo : new FormControl(),
  });


  onSubmit()
  {
   console.log(this.signUpForm.value);
   this.service.createServiceProvider(this.signUpForm)
  }
  gotoLogin()
  {
    this.router.navigateByUrl('login');
  }
}
