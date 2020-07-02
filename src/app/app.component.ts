import { Component } from '@angular/core';

import { Platform, MenuController, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { PopoverComponent } from './popover/popover.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userInfo = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    public popoverController: PopoverController,
    public authService : AuthService,
    public router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openEnd() {
    this.menu.close();
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
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

  gotoEdit()
  {
    this.menu.close();
    this.router.navigateByUrl('dashboard/tabs/profile/edit-provider-profile');''
  }
  gotoAppointment()
  {
    this.router.navigateByUrl('dashboard/tabs/profile/appointment');
  }
  logOut()
  {
    this.authService.logoutUser().then(
      () => {
        this.router.navigateByUrl('who-are-you');
      }
    );
  }
}
