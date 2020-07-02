import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  images = [];
  uploadPercent;
  downloadURL;
  image = [];
  galleryImage;
  img;
  constructor(public service : UtilityService,private imagePicker: ImagePicker,
    private storage : AngularFireStorage) { }

  ngOnInit() {
    this.service.getGallery().subscribe(x => {
      
      this.galleryImage = x;
      this.img = this.galleryImage.image
      console.log(this.img);
      console.log(this.galleryImage);
    
    })
    // this.service.getImages().subscribe(x => this.images = x.map(x =>{ return{
    //  item : x.payload.val()
    // }}))
    
    // setTimeout(()=> {
    //   console.log(this.images);
    // },5000)

  }
  getImages()
  {
    let options ={
      maximumImagesCount: 5,
      width: 250,
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
uploadImageTOFirebase(imageData)
{

  let base64Str = 'data:image/jpeg;base64,' + imageData;
 let storageRef = this.storage.ref('gallery');
//  this.showLoading("Uploading!!")
  let childRef = storageRef.child(`${new Date().getTime()}`);
  const task =  childRef.putString(base64Str, 'data_url');
  task.snapshotChanges().pipe(
    finalize(()=>{
          this.uploadPercent = task.percentageChanges();
          this.downloadURL = childRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.service.uploadImageToGallery(url);
          this.image.push(url); 
          console.log("image is" + this.image);           
      });
    })).subscribe(
      () => {
        // this.service.uploadImageToGallery(this.image);
        
      }
    );
      //  this.loadingController.dismiss();
  // .then((snapshot) => {
      // console.log("successfully uploaded...");
    //  / console.log(snapshot);
      
  }
}
