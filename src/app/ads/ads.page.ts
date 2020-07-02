import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
})
export class AdsPage implements OnInit, OnDestroy {
 id;
 ads;
 private subscription : Subscription
  constructor(private router : Router,private route : ActivatedRoute,
    private service : UtilityService
    ) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
   this.subscription = this.service.getAds(this.id).subscribe(x => this.ads = x.map(item =>{
     return {
       item : item.payload.val(),
       key : item.payload.key
     }
   }))
  }
  gotoDetails(key)
  {
    console.log(key);
    this.router.navigateByUrl('user-tabs/tabs/user-home/ads-detail/' + key);
  }
  
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
