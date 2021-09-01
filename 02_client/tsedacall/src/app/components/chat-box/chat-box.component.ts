import { Component, OnInit, ViewEncapsulation,OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Chat } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  @ViewChild('message_area') message_area: ElementRef;

  public status = false;
  public inputEl = '';
  public data: SafeHtml = '';
  public isAuthenticated:boolean = false;
  public userName;
  public allChat;
  public interval;
  public pattern_url = environment.apiUrl + 'profile/'
  public _id;
  userSubscription = new Subscription();
  messages: Observable<Chat[]>;
  
  constructor(private authService: AuthService, private userService:UserService,private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      setTimeout(() => {
        this.isAuthenticated = user ? true : false;
        if (this.isAuthenticated){
          this.userName = user.fname;
          this._id = JSON.parse(localStorage.getItem(this.authService.getLocalStorageToken()))._id
          this.userService.getMessages(this._id).subscribe((messages)=>{
            this.allChat = messages
            if (this.getNumberNotSeenMessage(this.allChat) >= 1) this.toggleChat();
            if (!messages.length){
              this.data = `<div class="income-msg"><img src="assets/images/chat-bot.jpg" class="avatar" alt=""><span class="msg">Hi ${this.userName}, how can I help you ?</span></div>`;
            } else {
              for (let message of messages){
                if (message.sender == 'client')
                  this.data += `<div class="out-msg"><span class="my-msg">${message.message}</span><img src="${this.pattern_url + this._id}" class="avatar" alt=""></div>`;
                else this.data += `<div class="income-msg"><img src="assets/images/chat-bot.jpg" class="avatar" alt=""><span class="msg">${message.message}</span></div>`;
              }
            }
          });
          var refreshMessages = () =>{
            clearInterval(this.interval);
            this.userService.getMessages(this._id).subscribe((messages)=>{
              this.allChat = messages
              if (this.getNumberNotSeenMessage(this.allChat) >= 1) this.toggleChat();
              this.data = ''
              if (!messages.length){
                this.data = `<div class="income-msg"><img src="assets/images/chat-bot.jpg" class="avatar" alt=""><span class="msg">Hi ${this.userName}, how can I help you ?</span></div>`;
              } else {
                for (let message of messages){
                  if (message.sender == 'client')
                    this.data += `<div class="out-msg"><span class="my-msg">${message.message}</span><img src="${this.pattern_url + this._id}" class="avatar" alt=""></div>`;
                  else this.data += `<div class="income-msg"><img src="assets/images/chat-bot.jpg" class="avatar" alt=""><span class="msg">${message.message}</span></div>`;
                }
              }
            });
            this.cd.detectChanges();
            this.interval = setInterval(refreshMessages, 10000);
          }
          this.interval = setInterval(refreshMessages, 10000);
        } else {
          this.data = '<div class="income-msg"><img src="assets/images/chat-bot.jpg" class="avatar" alt=""><span class="msg">You need to be logged for to use the chat !</span></div>';
          this.userName = null; 
        }
      }, 500);
    });
  }

  toggleChat() {
    this.message_area.nativeElement.scrollTop = this.message_area.nativeElement.scrollHeight;
    this.status = !this.status;
    this.userService.setMessageToSeen(this._id, 'support').subscribe((res)=>{
      this.userService.getMessages(this._id).subscribe((messages)=>{this.allChat = messages});
    })
  }

  onSend(){
    this.userService.sendMessageByChat(this.inputEl, this._id, 'client').subscribe((res => {
      let temp = `<div class="out-msg">
      <span class="my-msg">${this.inputEl}</span>
      <img src="${this.pattern_url + this._id}" class="avatar">
      </div>`;
      this.data += temp
      this.inputEl = ''
    }))
  }

  getNumberNotSeenMessage(chat){
    let counter = 0
    for (let message of chat)
      if (!message.seen && message.sender == 'support')
        counter += 1
    return counter
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
