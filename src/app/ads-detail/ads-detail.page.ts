import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ads-detail',
  templateUrl: './ads-detail.page.html',
  styleUrls: ['./ads-detail.page.scss'],
})
export class AdsDetailPage implements OnInit,OnDestroy {

  id;
  data;
  title;
  serviceProvider;
  image;price;description;userId;
  mobileNo;
  private subscription : Subscription
  constructor(private router : Router,private route : ActivatedRoute,
    private service : UtilityService) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  this.subscription = this.service.getAdDetails(this.id).subscribe(x => {
    this.data = x;
    console.log(this.data);
    this.title = this.data.title;
    this.image = this.data.image;
    this.description = this.data.description;
    this.price = this.data.price;
    this.userId = this.data.userId;
    this.service.getServiceProviderDetails(this.userId).subscribe(x => {
      this.serviceProvider = x;
      this.mobileNo = this.serviceProvider.mobileNo;
    
    })
    console.log(this.title);
  })
  }
ngOnDestroy()
{

}
BookAppointment()
{
  this.router.navigateByUrl('user-tabs/tabs/user-home/make-appointment/' + this.userId);
}
}
