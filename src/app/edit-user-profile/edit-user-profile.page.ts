import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.page.html',
  styleUrls: ['./edit-user-profile.page.scss'],
})
export class EditUserProfilePage implements OnInit,OnDestroy {
userInfo = [];
email;
private subscription : Subscription
  constructor(private authService : AuthService,public alertController : AlertController,
    public fireAuth : AngularFireAuth) { }

  ngOnInit() {
  this.subscription =  this.authService.getUser2Info().subscribe( (data) => {
      this.userInfo = data.map(list => {
        return {
        item : list.payload.val(),
        key : list.payload.key
      }})
    })
    this.email = this.fireAuth.auth.currentUser.email;
  }
ngOnDestroy()
{
 this.subscription.unsubscribe();
}  
async updateEmail(value)
{ 
   const alert = await this.alertController.create({
      subHeader : 'Login Again to perform this!',
      inputs : [
       {
         type : 'email',
         name : 'name',
         placeholder : 'Enter Email'
       },
       {
         type : 'password',
         name : 'name1',
         placeholder : 'Enter Password'
       }
     ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Login',
          handler: (data) => {
            this.authService.confirmlogin(data.name,data.name1,value)
          }
        }
      ]
    });
    await alert.present();
  }
  async updateName(dataa)
  {
    let message;
    let placeholder;
    if(dataa == 'n')
    {
      message = 'Update Full Name'
      placeholder = "Full Name"
      console.log("n");
    }
    else if(dataa == 'c')
    {
      placeholder = "City"
      message = 'Update City'
    }
    else if(dataa = 'm')
    {
      placeholder = "Mobible No"
      message = 'Update Mobile No:'
    }
    const alert = await this.alertController.create({
          
      message : message,
      inputs : [
       {
         type : 'text',
         name : 'name',
         placeholder : placeholder
       },
     ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Update',
          handler: (data) => {
            this.authService.updateUsername(data.name,dataa)
          }
        }
      ]
    });
    await alert.present();
  }
}
