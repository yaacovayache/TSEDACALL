import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Chat } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatBoxComponent implements OnInit {
  public status = false;
  public inputEl = '';
  public data: SafeHtml = '';
  public isAuthenticated:boolean = false;
  public userName;
  public _id;
  userSubscription = new Subscription();
  messages: Observable<Chat[]>;
  
  constructor(private authService: AuthService, private userService:UserService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      // The 500ms delay is for UX purposes only
      // fix bug: unwanted 500ms delay when refreshing page, keep only for login
      setTimeout(() => {
        this.isAuthenticated = user ? true : false;
        if (this.isAuthenticated){
          this.userName = user.fname;
          this._id = JSON.parse(localStorage.getItem(this.authService.getLocalStorageToken()))._id
          this.userService.getMessages(this._id).subscribe((messages)=>{
            console.log(messages)
            if (!messages.length){
              this.data = `<div class="income-msg"><img src="assets/images/chat-bot.jpg" class="avatar" alt=""><span class="msg">Hi ${this.userName}, how can I help you ?</span></div>`;
            } else {
              for (let message of messages)
                if ('client' in message)
                  this.data += `<div class="out-msg"><span class="my-msg">${message.client}</span><img src="assets/images/chat-bot.jpg" class="avatar" alt=""></div>`;
                else this.data = `<div class="income-msg"><img src="assets/images/chat-bot.jpg" class="avatar" alt=""><span class="msg">${message.support}</span></div>`;
            }
          });
          // if (user.isAdmin) this.isAdmin=true;
        } else {
          this.data = '<div class="income-msg"><img src="assets/images/chat-bot.jpg" class="avatar" alt=""><span class="msg">You need to be logged for to use the chat !</span></div>';
          this.userName = null; 
        }
      }, 500);
    });
  }

  toggleChat() {
    this.status = !this.status;
  }

  onSend(){
    this.userService.sendMessageByChat(this.inputEl, this._id).subscribe((res => {
      console.log(res)
      let temp = `<div class="out-msg">
      <span class="my-msg">${this.inputEl}</span>
      <img src="assets/images/chat-bot.jpg" class="avatar">
      </div>`;
      this.data += temp
      this.inputEl = ''
    }))
  }

}
