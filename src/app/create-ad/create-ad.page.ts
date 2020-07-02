import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { UtilityService } from '../utility.service';
@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
})
export class CreateAdPage implements OnInit {

  uploadPercent;
  downloadURL;
  image = [];
  private loader: HTMLIonLoadingElement;
  private loaderLoading = false;
  // title  = new FormControl(null,Validators.required);   
  constructor(private imagePicker: ImagePicker,public storage : AngularFireStorage,
    public loadingController: LoadingController,
    public utilityService : UtilityService
    ) { }

  ngOnInit() {
  }
  getImages()
  {
    let options ={
      maximumImagesCount: 3,
      width: 200,
      quality: 25,
      outputType: 1
  };
  this.imagePicker.getPictures(options).then((results) => {  
    for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.uploadImageTOFirebase(results[i]);
        console.log(results[i].name)   
    }
  }, (err) => { });
}
  basic = new FormGroup({
    title : new FormControl(null,Validators.required),
    category : new FormControl(null,Validators.required),
    description : new FormControl(null,Validators.required),
    price : new FormControl(null,Validators.required)
  })

  basicUpload()
  {
    this.utilityService.createAd(this.basic,this.image)
  }
 async uploadImageTOFirebase(imageData)
  {
    const loading = await this.loadingController.create({
      message: 'Please wait.. Uploading!'
 });
    let base64Str = 'data:image/jpeg;base64,' + imageData;
   let storageRef = this.storage.ref('images');
  //  this.showLoading("Uploading!!")
    let childRef = storageRef.child(`${new Date().getTime()}`);
    const task =  childRef.putString(base64Str, 'data_url');
    task.snapshotChanges().pipe(
      finalize(()=>{
            this.uploadPercent = task.percentageChanges();
            this.downloadURL = childRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
            this.image.push(url); 
            console.log("image is" + this.image);
            loading.dismiss();         
        });
      })).subscribe();
    }
    async presentLoading(loading) {
      this.loadingController.create()
      return await loading.present();
      } 
  }

