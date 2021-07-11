import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { User, AuthResponseData, Chat } from '../models/user.model';
import { ReqMessage } from '../models/res-message.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = window.location.protocol + '//' + window.location.hostname + ':3000/';
  public chatIsEmpty=false;

  associationsStore:User[] = [];
  associationsChanged = new BehaviorSubject<User[]>([]);
  readonly associations = this.associationsChanged.asObservable();

  messagesStore:Chat[] = [];
  messagesChanged = new BehaviorSubject<Chat[]>([]);
  readonly messages = this.messagesChanged.asObservable();

  constructor(private http: HttpClient) { }

  public getAssociations(){
    return this.http.get<User[]>(this.rootUrl + 'associations').subscribe(
      associations => {
        this.associationsStore = associations;
        this.associationsChanged.next(this.associationsStore);
      });
  }

  public getUserById(id){
    return this.http.get<User>(this.rootUrl + `user/uid/${id}`);
  }

  public sendMessageByChat(message, id){
    return this.http.post<ReqMessage>(this.rootUrl + `send/message/${id}`, {message:message});
  }

  public getMessages(id){
    return this.http.get<Chat[]>(this.rootUrl + `message/${id}`)
  }

}
