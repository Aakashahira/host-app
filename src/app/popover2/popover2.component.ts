import { Component, OnInit } from '@angular/core';
import { PopoverController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-popover2',
  templateUrl: './popover2.component.html',
  styleUrls: ['./popover2.component.scss'],
})
export class Popover2Component implements OnInit {
  uploadPercent;
  downloadURL;
  image;
  key;
  constructor(public popoverController: PopoverController,
    public loadingController : LoadingController,
    public storage : AngularFireStorage,
    public db : AngularFireDatabase,
    public authService : AuthService) { }

  ngOnInit() {
    this.authService.getUser2Info().subscribe(x => this.key = x.map(x=>x.payload.key))
  }
  close()
  {
    this.popoverController.dismiss();
  }
  async onUpload(event)
  {
    let userId;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    
    });
    await loading.present();
  const file = event.target.files[0];
  const filePath = `images/${new Date().getTime() + file.name}`;
  const ref = this.storage.ref(filePath);
  const task = ref.put(file);
  task.snapshotChanges().pipe(
    finalize(()=>{
      this.uploadPercent = task.percentageChanges();
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.image = url;
          this.db.object('user/' + this.key).update({profile : this.image}).then(
             () => {
              console.log("image is" + this.image); 
              loading.dismiss();
              this.popoverController.dismiss();
            })
  
          });
    })).subscribe();
  
  }

}
