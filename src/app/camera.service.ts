import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Camera, CameraOptions} from "@ionic-native/camera/ngx";

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private db: AngularFireDatabase, private camera: Camera) { }


  
  getPicture() : Promise<any> {

    let options: CameraOptions = {
     // quality: 100,  // quality  of the image 
      allowEdit: true,  // alow simple editing of the image before selection 
      saveToPhotoAlbum: true,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
     // get the picture 
     return this.camera.getPicture(options);
   }
}
