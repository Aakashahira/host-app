import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { ChatService } from '../chat.service';
import { map } from "rxjs/operators";
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import {User} from '../user'
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
 uid;
 uids : any;
 users: User[] = new Array<User>();
 chats : any; 
  constructor(private service : UtilityService,private chatService : ChatService,
    private db : AngularFireDatabase,
    private router : Router
    ) { }

  ngOnInit() {
    this.service.getSPId().subscribe((data) => {
      data.map(x => {
        this.uid = x.payload.key;
         console.log("uid",this.uid);
        this.chatService.getChat(this.uid).snapshotChanges().pipe(
         map(changes => changes.map(c => ({
           key : c.payload.key,  ...c.payload.val,
         }))
         )).subscribe(uids => {
          uids.map(uid => {
             console.log('user', uid);
             this.db.object(`/user/${uid.key}`).valueChanges().subscribe((user: User) => { user.key = uid.key;  this.users.push(user)});
             })
             console.log('1', this.users);
           })
       }
     )
   })
  }
  openChat(key)
  {
   this.chatService.chatter =  {
     uid : this.uid,
     interlocutorUID : key
   }
   this.router.navigateByUrl('dashboard/tabs/inbox/inbox-view/' + key);
  }
}
