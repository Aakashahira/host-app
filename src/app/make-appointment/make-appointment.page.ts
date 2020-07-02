import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {
   id;
  spDetails;
  image;
  mobileNo;
  fullName;
  companyName;
  address
  serviceProvider
  constructor(private route : ActivatedRoute,
              private service : UtilityService) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // this.service.getServiceProviderDetails(this.id).subscribe(x => {
    //   this.serviceProvider = x;
    //   console.log(this.serviceProvider);
    //   this.mobileNo = this.serviceProvider[0].mobileNo;
    //   console.log(this.mobileNo);
    
    // })
    this.service.getServiceProviderDetails(this.id).subscribe(data => {
     this.spDetails = data;
     console.log(this.spDetails);
     this.image = this.spDetails[0].profile,
     console.log(this.spDetails[0].profile);
     console.log(this.image);
     this.mobileNo = this.spDetails[0].mobileNo,
     this.fullName = this.spDetails[0].fullName,
     this.companyName = this.spDetails[0].companyName,
     this.address = this.spDetails[0].address 
    })
  }

   appointment = new FormGroup({
      date : new FormControl(null,Validators.required),
      time : new FormControl(null,Validators.required),
      message : new FormControl(null,Validators.required),
      // serviceProvider : new FormControl(this.id),
   })
   onSubmit()
   {
     console.log(this.appointment.value);
     this.service.makeAppointment(this.appointment,this.id)
   }
}
