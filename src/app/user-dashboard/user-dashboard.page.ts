import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../utility.service';
import { map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit,OnDestroy {

   serviceProviders = [];
   image;
   category;
   public subscription : Subscription;
   id;
   city;
  constructor(private service : UtilityService,
              private router : Router,
              private route : ActivatedRoute,
              private authService : AuthService
              ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
  }

  ngOnInit() {
  this.subscription = this.service.getServiceProviders(this.id).subscribe(list =>{
      this.serviceProviders = list.map(item =>{ return{
          item : item.payload.val(),
          key : item.payload.key   
      }})
    })
  
  this.authService.getUser2Info().subscribe( (data) => {
        data.map(list => {
      this.city = list.payload.child('city').val();
   })
  })
}
ngOnDestroy()
{
  this.subscription.unsubscribe();
}
gotoAds(key)
{
  console.log(key);
  this.router.navigateByUrl('user-tabs/tabs/user-home/ads/'+ key);
}
gotoGallery(userId)
{
  this.router.navigateByUrl('user-tabs/tabs/user-home/user-gallery/'+ userId);
}
gotoChat(key)
{
  this.router.navigateByUrl('user-tabs/tabs/user-inbox/chat-view/' + key) 
}
customAlertOptions: any ={
  subHeader: 'Select City',
  translucent: true
};
}