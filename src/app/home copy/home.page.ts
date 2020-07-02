import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  userInfo;
  constructor(private router : Router,public authService : AuthService) {}
  gotoAdPage(){
     this.router.navigateByUrl('dashboard/tabs/home/create-ad')
  }

  ngOnInit()
  {
    this.authService.getUserInfo().subscribe( (data) => {
      this.userInfo = data.map(list => {
        return {
        item : list.payload.val(),
        key : list.payload.key
      }})
    })
  }

  gotoGallery() {
    this.router.navigateByUrl('dashboard/tabs/home/gallery');
  }
  gotoMyAds()
  {
    this.router.navigateByUrl('dashboard/tabs/home/my-ads');
  }

  gotoCustomers(){
    this.router.navigateByUrl('dashboard/tabs/home/customers');
}
}
