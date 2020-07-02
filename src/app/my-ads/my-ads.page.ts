import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { UtilityService } from '../utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.page.html',
  styleUrls: ['./my-ads.page.scss'],
})
export class MyAdsPage implements OnInit {

  ads;
  id;
  private subscription : Subscription;
  constructor(private service : UtilityService,private router : Router) { }

  ngOnInit() {
    this.id = window.localStorage.getItem("userId");
    this.subscription = this.service.getAds(this.id).subscribe(x => this.ads = x.map(item =>{
      return {
        item : item.payload.val(),
        key : item.payload.key
      }
    }))
  }
  gotoDetails(key)
  {
     this.router.navigateByUrl('dashboard/tabs/home/my-ad-details/' + key);
  }
}
