import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat, User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit, OnDestroy {
  public users: Observable<User[]>;
  public pattern_url = environment.apiUrl + 'profile/'
  public current_user:User;
  public inputEl = '';
  public interval;

  constructor(private userService:UserService,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.users = this.userService.usersWithMessages; // subscribe to entire collection
    this.userService.getUsersWithMessages();
    var refreshMessages = () =>{
      clearInterval(this.interval);
      this.users = this.userService.usersWithMessages; // subscribe to entire collection
      this.userService.getUsersWithMessages();
      this.cd.detectChanges();
      this.interval = setInterval(refreshMessages, 10000);
    }
    this.interval = setInterval(refreshMessages, 10000);
  }

  refresh() {
    this.cd.detectChanges();
  }

  setToCurrentChat(user){
    this.current_user = user
    this.userService.setMessageToSeen(user._id, 'client').subscribe((res)=>{
      this.users = this.userService.usersWithMessages; // subscribe to entire collection
      this.userService.getUsersWithMessages();
    })
  }

  getIfNewMessages(chat){
    return (this.getNumberNotSeenMessage(chat) >= 1)? true : false
  }

  
  getNumberNotSeenMessage(chat){
    let counter = 0
    for (let message of chat)
      if (!message.seen && message.sender == 'client')
        counter += 1
    return counter
  }

  sendMessage(id){
    this.userService.sendMessageByChat(this.inputEl,id, 'support').subscribe((res => {
      this.users = this.userService.usersWithMessages; // subscribe to entire collection
      this.userService.getUsersWithMessages();
      this.userService.getMessages(this.current_user._id).subscribe((res)=>{
        this.current_user.chat = res
      })
      this.inputEl = ''
      // this.refresh()
    }))
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
