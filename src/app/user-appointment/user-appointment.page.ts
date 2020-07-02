import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../utility.service';
import { timeout } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.page.html',
  styleUrls: ['./user-appointment.page.scss'],
})
export class UserAppointmentPage implements OnInit,OnDestroy {

  appointment = [];
  sp;
  profile;
  private subscription : Subscription;
  constructor(private service : UtilityService) {
    
   }

  ngOnInit() {
  this.subscription = this.service.getAppointment().subscribe(data =>data.map(
      item => {
         this.service.getServiceProviderDetails(item.payload.child('serviceProvider').val()).subscribe(
         x => {
           this.sp =x;
           console.log(this.sp[0].profile);
           this.appointment.push({item:item.payload.val(),key:item.payload.key
            ,profile : this.sp[0].profile,fullName : this.sp[0].fullName,
            company : this.sp[0].companyName,address : this.sp[0].address,mobileNo : this.sp[0].mobileNo})
          //  this.profile = this.sp[0].profile
         }
         )
          // return {
          // item : item.payload.val(),
          // key : item.payload.key,  
          // }        
      }
    ));
  
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
