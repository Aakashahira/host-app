import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit,OnDestroy {

  userInfo = [];
  subscription : Subscription;
  galleryImage = [];
  img = [];
  photos;
  ap;
  constructor(public authService : AuthService,public router : Router,public service : UtilityService) { }

  ngOnInit() {
  this.subscription = this.authService.getUserInfo().subscribe( (data) => {
      this.userInfo = data.map(list => {
        return {
        item : list.payload.val(),
        key : list.payload.key
      }})
    })

    this.service.getGallery().subscribe(x => {
      this.galleryImage = x;
      this.photos = this.galleryImage.length;
      console.log(this.galleryImage);
  })
    this.service.getAppointment().subscribe( x => {
      this.img = x;
     this.ap =  this.img.length;
    })
  }
  gotoInbox()
  {
   this.router.navigateByUrl('dashboard/tabs/inbox');
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
  gotoAppointment()
  {
    this.router.navigateByUrl('dashboard/tabs/profile/appointment');
  }
  gotoGallery()
  {
    this.router.navigateByUrl('dashboard/tabs/home/gallery');
  }
}
