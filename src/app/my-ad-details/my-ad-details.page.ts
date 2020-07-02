import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-ad-details',
  templateUrl: './my-ad-details.page.html',
  styleUrls: ['./my-ad-details.page.scss'],
})
export class MyAdDetailsPage implements OnInit {

  id;
  ad
  image;
  subscription : Subscription;
  constructor(private service : UtilityService,private router : Router, private route : ActivatedRoute) { 

    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
   this.subscription = this.service.getAdDetails(this.id).subscribe(data => {
      this.ad = data;
      this.image = this.ad.image;
      console.log(this.ad);
     });
  }
  deleteAd()
  {
    this.service.removeAd(this.id).then(
      () => 
      {
      console.log("ad has been removed");
      this.router.navigateByUrl('dashboard/tabs/home/my-ads');
      }).catch(
        (err) => {
          console.log(err)
        })
  }
}
