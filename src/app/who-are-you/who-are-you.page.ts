import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-who-are-you',
  templateUrl: './who-are-you.page.html',
  styleUrls: ['./who-are-you.page.scss'],
})
export class WhoAreYouPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
gotoSignUp2()
{
  this.router.navigateByUrl('signup2');
}
gotoSignUp()
{
  this.router.navigateByUrl('signup');
}
}
