import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit,OnDestroy {

   private subscription : Subscription;
   sp;appointment = []
  constructor(private service : UtilityService) { }

  ngOnInit() {
   this.subscription = this.service.getAppointment().subscribe(data =>data.map(
      item => {
        console.log(item.payload.val());
         this.service.getUserDetais(item.payload.child('userId').val()).subscribe(
         x => {
           this.sp =x;
           console.log(this.sp[0].profile);
           this.appointment.push({item:item.payload.val(),key:item.payload.key
            ,profile : this.sp[0].profile,fullName : this.sp[0].fullName,
            email : this.sp[0].email,mobileNo : this.sp[0].mobileNo})
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
  onChange(key,event)
  {
   console.log("key",key);
   console.log(event.target.value);
   this.service.updateAppointment(key,event.target.value)
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
