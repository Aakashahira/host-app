import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { UtilityService } from '../utility.service';
import { map } from "rxjs/operators";
import { AngularFireDatabase } from '@angular/fire/database';
import {User} from '../user'
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-inbox',
  templateUrl: './user-inbox.page.html',
  styleUrls: ['./user-inbox.page.scss'],
})
export class UserInboxPage implements OnInit {

   uid;
  // chat


  uids : any;
  users: User[] = new Array<User>();
  chats : any; 
   constructor(private chatService :ChatService, private service : UtilityService,
    private db : AngularFireDatabase,
    private router : Router
    ) { }

  ngOnInit() {
      this.service.getUserId().subscribe((data) => {
         data.map(x => {
           this.uid = x.payload.key;

           this.chatService.getChats(this.uid).snapshotChanges().pipe(
            map(changes => changes.map(c => ({
              key : c.payload.key,  ...c.payload.val,
            }))
            )).subscribe(uids => {
             uids.map(uid => {
                console.log('user', uid);
                this.db.object(`/service-providers/${uid.key}`).valueChanges().subscribe((user: User) => { user.key = uid.key;  this.users.push(user)});
                })
                console.log('1', this.users);
              })
          }
        )
      })
  }
   openChat(key)
   {
     console.log("key",key);
    this.chatService.chatter =  {
      uid : this.uid,
      interlocutorUID : key
    }
    this.router.navigateByUrl('/user-tabs/tabs/user-inbox/chat-view/' + key);
   }
}
