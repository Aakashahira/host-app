import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  ads : AngularFireList<any>;
  constructor(public db : AngularFireDatabase,
              public toastController: ToastController,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public router : Router 
    ) { }

  async createAd(data,image)
   {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
        let userId = window.localStorage.getItem("userId");
        this.ads = this.db.list('ads');
        this.ads.push({
             title : data.value.title,
             category : data.value.category,
             description : data.value.description,
             price : data.value.price,
             image : image,
             userId : userId
    }).then(
      () => {
             loading.dismiss();
             this.presentAlert("Ad Created Successfully");
             this.router.navigateByUrl('dashboard/tabs/home/my-ads');
      }
    ).catch(
      () => {
        loading.dismiss();
      });   
   }

        getImages(){
            let userId = window.localStorage.getItem("userId");
            return this.db.list('ads', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
        }
        getAds(userId)
          {
           console.log(userId);
          return this.db.list('ads',ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
          }
       getServiceProviders(id : string)
        {
      return this.db.list('service-providers', ref => ref.orderByChild('serviceType').equalTo(id)).snapshotChanges();
        }
       getAdDetails(key)
        {
         return this.db.object('ads/' + key).valueChanges();
        }
      getServiceProviderDetails(userId)
       {
        console.log(userId);
        return this.db.list('service-providers', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
       }
      uploadImageToGallery(image)
       {
        let userId = window.localStorage.getItem("userId");
        this.db.list('gallery').push({image:image,userId : userId});
       }
      getGallery()
       {
        let userId = window.localStorage.getItem("userId");
        return this.db.list('gallery',ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
       }
      getGallery2(userId)
       {
        return this.db.list('gallery',ref => ref.orderByChild('userId').equalTo(userId)).valueChanges()
       }
     async makeAppointment(form,sp)
      {
         const loading = await this.loadingController.create({
         message: 'Please wait...'
    });
        let date = new Date(form.value.date).toISOString();
        let t1 = new Date(form.value.time).getHours().toString();
        let t2 = new Date(form.value.time).getMinutes().toString();
        let time = t1 + ":" + t2;
        console.log("date",date);
        console.log("time",time);
        let userId = window.localStorage.getItem("userId");
        this.db.list('appointment').push({
        date : date,
        time : time,
        message : form.value.message,
        serviceProvider : sp,
        userId : userId,
        approval : 'pending'
     }).then(
       ()=> {
        loading.dismiss();
        this.presentAlert("Please Wait for confirmation by Serive Provider");
        this.router.navigateByUrl('user-tabs/tabs/user-home'); 
        console.log("appointment sent");
       }
     ).catch(
       () => {
         loading.dismiss();
         this.presentAlert("Request Sent! Please Wait for confirmation by Serive Provider")
       })
   }
   getAppointment()
   {
     let userId = window.localStorage.getItem("userId");
     console.log(userId);
    return this.db.list('appointment', ref => ref.orderByChild('serviceProvider').equalTo(userId)).snapshotChanges();
   }
   getUserDetais(userId)
   {
    return this.db.list('user', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
   }
   updateAppointment(key,value)
   {
     return this.db.object('appointment/' + key).update({approval : value})
   }
  
  async presentAlert(message) {
    const alert = await this.alertController.create({
    message: message,
    buttons: ['Ok']
  });
  await alert.present();
}
  getSp(key)
  {
  return this.db.object('service-providers/' + key).valueChanges();
  }
  getUser(key)
  {
  return this.db.object('user/' + key).valueChanges();
  }
 sendMessage(senderId,message)
  {
   let userId = window.localStorage.getItem("userId");
     return this.db.list('chat/'+ userId).push({
       senderId : senderId,
       message : message,
       userId : userId
})
}
  getUserId()
  {
  let userId = window.localStorage.getItem("userId");
   return this.db.list('user',ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }
  getSPId()
  {
  let userId = window.localStorage.getItem("userId");
  return this.db.list('service-providers',ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }
  removeAd(key)
  {
  return this.db.object('ads/' + key).remove();
  }
  async presentLoading(loading) {
  this.loadingController.create()
  return await loading.present();
  } 
// gotNewMessage()
// {
//   return this.db.list('chat').
// }

}


// getAllChat() 
// {
//   let userId = window.localStorage.getItem('userId');
//    return this.db.list('chat/' + userId, ref => ref.)
// }
// getChat(senderId)
// {
//   let userId = window.localStorage.getItem("userId");
//   return this.db.list('chat/' + userId,ref => ref.orderByChild('senderId').equalTo(senderId)).valueChanges();
// }
// getSpChat()
// {
//   let userId = window.localStorage.getItem("userId");
//   return this.db.list('chat', ref => ref.orderByChild('senderId').equalTo(userId)).snapshotChanges();   
// }

