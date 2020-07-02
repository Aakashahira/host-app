import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Chatter } from './chatter.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chatter : Chatter; 
  constructor(private db : AngularFireDatabase) { 
    this.chatter = new Chatter();
  }
  getChats(uid){
    let userId = window.localStorage.getItem("userId");
  
    console.log('getChats uid', userId);
   return  this.db.list(`/user/${uid}/chats`);
   }
  getChat(uid)
  {
    return this.db.list(`/service-providers/${uid}/chats`);
  }

   addChats(uid: string, interlocutorUID : string) : void  {
    //firest user
    console.log("uid", uid);
    console.log("lc", interlocutorUID);
    let endPoint : AngularFireObject<boolean> = this.db.object(`/user/${uid}/chats/${interlocutorUID}`);
    endPoint.set(true);

    let endPoint2 :AngularFireObject<boolean> = this.db.object(`/service-providers/${interlocutorUID}/chats/${uid}`);
    endPoint2.set(true);
  }

  getChatRef(uid : string, interlocutorUID: string) : Promise<any> {
     console.log(interlocutorUID);
    let firstRef =  this.db.object(`chats/${uid},${interlocutorUID}`); 
    let promise = new Promise((resolve, reject) => {
      firstRef.snapshotChanges().subscribe(snpashot => {
        let a = snpashot.payload.exists();
        if(a) {
          resolve(`chats/${uid},${interlocutorUID}`);
        } else {
          let secondRef = this.db.object(`chats/${interlocutorUID},${uid}`);
          secondRef.snapshotChanges().subscribe(snpashot => {
            let b = snpashot.payload.exists(); 
            if(!b) {
              this.addChats(uid, interlocutorUID);
            }
          });
          resolve(`/chats/${interlocutorUID},${uid}`);
          }
        });

      });  
        // return a Promise which reolves to the firebase database URL of chats beteween the 2 users 
          return promise;
      }
    
}

