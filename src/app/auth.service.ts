import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loader: HTMLIonLoadingElement;
  private loaderLoading = false;
  public serviceProviders : AngularFireList<any>;
  public user : AngularFireList<any>;
  public userId;
  constructor(private auth : AngularFireAuth,public loadingController: LoadingController,
    public db:AngularFireDatabase,
    public alertController: AlertController,
    private router : Router,
    public toastController: ToastController
    ) { }
  async createServiceProvider(data)
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    
    this.auth.auth.createUserWithEmailAndPassword(data.value.email,data.value.password).then(
      () => {
        this.userId = this
         this.serviceProviders =  this.db.list('service-providers');
         this.db.list('service-providers').push({
            fullName : data.value.fullName,
            companyName : data.value.companyName,
            email : data.value.email,
            password : data.value.password,
            serviceType: data.value.serviceType,
            city : data.value.city,
            address : data.value.address,
            mobileNo : data.value.mobileNo,
            profile : 'assets/p.png',
            type : 'Service Provider',
            userId : this.userId 
          }).then(
           () => {
            window.localStorage.setItem('userId',this.userId)
                loading.dismiss();
                this.router.navigateByUrl('dashboard');   
              })
        console.log("user created");
      }).catch((err) => {
             loading.dismiss();
          this.presentAlert(err.message);
            console.log(err)
        console.log(err);
      })
      
  }

async presentAlert(message) {
  const alert = await this.alertController.create({
    header: 'Auth Failed',
    
    message: message,
    buttons: ['Try Again']
  });

  await alert.present();
}

async loginUser(email,password)
{
  const loading = await this.loadingController.create({
    message: 'Please wait...'
  });
  this.presentLoading(loading);
  this.auth.auth.signInWithEmailAndPassword(email,password).then (
    () => {
      this.userId = this.auth;
      window.localStorage.setItem('userId',this.userId);
     loading.dismiss();
      this.router.navigateByUrl('dashboard');      
    }).catch(err => {
      loading.dismiss();
      this.presentAlert(err)
    })
}
async loginUser2(email,password)
{
  const loading = await this.loadingController.create({
    message: 'Please wait...'
  });
  this.presentLoading(loading);
  this.auth.auth.signInWithEmailAndPassword(email,password).then (
    () => {
      this.userId = this.auth.auth.currentUser.uid;
      window.localStorage.setItem('userId',this.userId);
      loading.dismiss();
      this.router.navigateByUrl('user-tabs');      
    }).catch(err => {
      loading.dismiss();
      this.presentAlert(err)
    })
}
getUserInfo()
{
  let userId = window.localStorage.getItem("userId");
 return this.db.list('service-providers', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();  
}

getUser2Info()
{
  let userId = window.localStorage.getItem("userId");
 return this.db.list('user', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
}
async createUser(data)
{
  const loading = await this.loadingController.create({
    message: 'Please wait...'
  });
  this.presentLoading(loading);
  this.auth.auth.createUserWithEmailAndPassword(data.value.email,data.value.password).then(
    () => {
      this.userId = this.auth.auth.currentUser.uid;
       this.serviceProviders =  this.db.list('user');
       this.db.list('user').push({
          fullName : data.value.fullName,
          email : data.value.email,
          password : data.value.password,
          gender : data.value.gender,
          dob : data.value.date,
          city : data.value.city,
          address : data.value.address,
          mobileNo : data.value.mobileNo,
          profile : 'assets/p.png',
          type : 'user',
          userId : this.userId 
        }).then(
         () => {    
             window.localStorage.setItem('userId',this.userId)
              loading.dismiss();
              this.router.navigateByUrl('user-tabs');   
            })
              console.log("user created");
    }).catch( (err) => {
             loading.dismiss();
             this.presentAlert(err.message);
             console.log(err)
             console.log(err);
    })
   
}
async confirmlogin(email,password,value)
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
   return this.auth.auth.signInWithEmailAndPassword(email,password).then(
      (res) => {
                console.log("we are here");
                this.userId = this.auth.auth.currentUser.uid 
                window.localStorage.setItem("userId",this.userId); 
                console.log(res);
                loading.dismiss();
              if(value == "e")
              {
                this.updateEmail2();
              }
              else if(value == "p")
              {
                this.updatePassword2()
              }}
    ).catch(
      (err) => {
        console.log(err);
       loading.dismiss();
       this.presentAlert(err.message);
      })

    }
    updatePassword(pass)
    {
      return this.auth.auth.currentUser.updatePassword(pass).then(
      () => {
        console.log("password updated");
        this.presentToast("Password has been updated!")
      }).catch(
        (err) => {
          this.presentToast(err);          
        })
    }
    async updateEmail2()
    { 
       const alert = await this.alertController.create({
        
           message : 'update Email',
          inputs : [
           {
             type : 'email',
             name : 'name',
             placeholder : 'Enter Email'
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
                this.updateEmail(data.name);          
              }
            }
          ]
        });
        await alert.present();
      }
      async updatePassword2()
      { 
         const alert = await this.alertController.create({
          
            message : 'Update Password',
            inputs : [
             {
               type : 'password',
               name : 'name',
               placeholder : 'Enter Password'
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
                  this.updatePassword(data.name)
                }
              }
            ]
          });
          await alert.present();
        }

        async presentToast(message) {
          const toast = await this.toastController.create({
            message: message,
            duration: 3000
          });
          toast.present();
        }
        updateEmail(email)
  {
    this.auth.auth.currentUser.updateEmail(email).then(
      () => {
        console.log("updated")
        this.presentToast("Email has been updated!")
      }).catch(err => {
        this.presentToast(err);
        console.log(err)
      });
  }

  updateUsername(data,value)
  {
    this.getUserInfo().subscribe(x =>x.map(x => {
   let key =x.payload.key;
   if(value == 'n')
   {
    this.db.object('service-providers/' + key).update({fullName : data}).then(
      () => {
        this.presentToast("Username has been updated!")
      });
   }
   else if(value == 'c')
   {
    this.db.object('service-providers/' + key).update({city : data}).then(
      () => {
        this.presentToast("City has been updated!")
      });
   }
   else if(value == 'm')
   {
    this.db.object('service-providers/' + key).update({mobileNo : data}).then(
      () => {
        this.presentToast("Mobile No has been updated!")
      });
   }
   else if(value == 'co')
   {
    this.db.object('service-providers/' + key).update({companyName : data}).then(
      () => {
        this.presentToast("Company Name has been updated!")
      });
   }
   else if(value == 'ad')
   {
    this.db.object('service-providers/' + key).update({address : data}).then(
      () => {
        this.presentToast("Address has been updated!")
      });
   }
  } ))
  }
  logoutUser()
  {
   return this.auth.auth.signOut();
  }

  async presentLoading(loading) {
    this.loadingController.create()
    return await loading.present();
  } 
}
