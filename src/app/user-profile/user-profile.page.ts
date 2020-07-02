import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Popover2Component} from '../popover2/popover2.component'
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
   userInfo
  constructor(private router : Router,public popoverController: PopoverController,
    private authService : AuthService,
    ) { }

  ngOnInit() {
    this.authService.getUser2Info().subscribe( (data) => {
      this.userInfo = data.map(list => {
        return {
        item : list.payload.val(),
        key : list.payload.key
      }})
    })
  }
  gotoProfile()
  {
    this.router.navigateByUrl('user-tabs/tabs/user-profile/edit-user-profile');
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: Popover2Component,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  logout()
   {
     this.authService.logoutUser().then(
       () => {
         console.log("User is logged out!");
         window.localStorage.clear();
         this.router.navigateByUrl('who-are-you'); 
       }
     );
    //  
    //  this.router.navigateByUrl('who-are-you');
   }
}
