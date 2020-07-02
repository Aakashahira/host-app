import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.page.html',
  styleUrls: ['./user-gallery.page.scss'],
})
export class UserGalleryPage implements OnInit,OnDestroy {
id;
galleryImage;
private subscription : Subscription
  constructor(private router : Router,private route : ActivatedRoute,
    private service : UtilityService) { 
      this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
     this.subscription = this.service.getGallery2(this.id).subscribe(x => this.galleryImage = x);
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
