import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from '../utility.service';
import { Subscription } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Chat } from '../chat';
import { ChatService } from '../chat.service';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.page.html',
  styleUrls: ['./chat-view.page.scss'],
})
export class ChatViewPage implements OnInit{
   id;
  //  data;
  //  fullName;
  //  message = "";
  //  chat = [];
  //  private subscription : Subscription;

  message: string;
  uid : string = ''; 
  interlocutorUID : string  = ''; 
  chats: Array<Chat>;
  user; 
  sp;
  chatsRef : AngularFireList<Chat>;
    showNow = false;
  // uidData: User; 
  // interlocutorUIDData : User; 
  constructor(private route : ActivatedRoute,
    private service : UtilityService,
    private db : AngularFireDatabase,
    private chatsService : ChatService,
    private camera: CameraService
    ) {    
       this.id = this.route.snapshot.paramMap.get('id');
  }
   sendMessage() : void {
    if(this.message) {
      let chat : Chat = {
        from: this.uid,
        message : this.message,
        type: 'message',
        to: this.interlocutorUID,
        picture : null
      };
      this.chatsRef.push(chat);
      this.message ="";
    }
  }; 
  
  sendPicture() : void {

    this.camera.getPicture().then(imageData => {
    let chat: Chat  = {
      from: this.uid,
      message: '',
      type: 'picture',
      picture: 'data:image/jpeg;base64,' + imageData,
      to: this.interlocutorUID,
    };
    this.chatsRef.push(chat);
    }).catch(err => console.log(err));
  }

  ngOnInit() {
    setTimeout(() => {
      this.showNow = true
    }, 2000); 
    
    this.service.getSp(this.id).subscribe((data) => {
      this.sp = data;
      console.log(this.sp);
    })
 // this.uid  = this.chatsService.chatter.uid
 this.service.getUserId().subscribe(x => x.map(x =>{ this.uid = 
   x.payload.key;
   this.user = x.payload.val();
   console.log("user", this.user);
 this.interlocutorUID =  this.id;

 // get chat Reference 
 console.log("uid",this.uid)
 this.chatsService.getChatRef(this.uid, this.interlocutorUID).then((chatRefPath : string) => {
   console.log('chatRef: uid, interlocutorUID', chatRefPath);
   this.chatsRef = this.db.list(chatRefPath);
   this.db.list(chatRefPath).valueChanges().subscribe((chats :  Chat[]) => { console.log('chats', chats);  this.chats = chats }) ;

 }); 
 // this.db.object(`/user/${this.uid}`).valueChanges().subscribe((user : User) => { console.log('loged user', user); this.uidData = user });
 // this.db.object(`/user/${this.interlocutorUID}`).valueChanges().subscribe((user : User) => { console.log('interlo', user);  this.interlocutorUIDData = user });
}))

  }
  
}
