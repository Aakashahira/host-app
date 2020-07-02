import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  userInfo = [];
  city;
  constructor(private router : Router,public authService : AuthService) { }
  gotoAdPage(){
    // this.router.navigateByUrl('dashboard/tabs/home/create-ad')
 }
  ngOnInit() {
    this.authService.getUser2Info().subscribe( (data) => {
      this.userInfo = data.map(list => {
        this.city = list.payload.child('city').val();
        return {
        item : list.payload.val(),
        key : list.payload.key
      }})
    })
  }
  gotoWedding()
  {
    this.router.navigateByUrl('user-tabs/tabs/user-home/user-dashboard/'+'wedding');
  }
  gotoParty()
  {
    this.router.navigateByUrl('user-tabs/tabs/user-home/user-dashboard/'+'party');
  }
  gotoCorporate()
  {
    this.router.navigateByUrl('user-tabs/tabs/user-home/user-dashboard/'+ 'corporate');
  }
  gotoOthers()
  {
    this.router.navigateByUrl('user-tabs/tabs/user-home/user-dashboard/'+ 'others');
  }
  // gotoGallery() {
  //   this.router.navigateByUrl('dashboard/tabs/home/gallery');
  // }
}
