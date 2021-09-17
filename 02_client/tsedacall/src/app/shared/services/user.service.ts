import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { User, AuthResponseData, Chat } from '../models/user.model';
import { ReqMessage } from '../models/res-message.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public chatIsEmpty=false;

  associationsStore:User[] = [];
  associationsChanged = new BehaviorSubject<User[]>([]);
  readonly associations = this.associationsChanged.asObservable();

  messagesStore:Chat[] = [];
  messagesChanged = new BehaviorSubject<Chat[]>([]);
  readonly messages = this.messagesChanged.asObservable();

  usersWithMessagesStore:User[] = [];
  usersWithMessagesChanged = new BehaviorSubject<User[]>([]);
  readonly usersWithMessages = this.usersWithMessagesChanged.asObservable();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  public getAssociations(){
    return this.http.get<User[]>(environment.apiUrl + 'associations').subscribe(
      associations => {
        this.associationsStore = associations;
        this.associationsChanged.next(this.associationsStore);
      });
  }

  public getUserById(id){
    return this.http.get<User>(environment.apiUrl + `user/uid/${id}`);
  }

  public sendMessageByChat(message, id, type){
    return this.http.post<ReqMessage>(environment.apiUrl + `send/message/${id}/${type}`, {message:message});
  }

  public getMessages(id){
    return this.http.get<Chat[]>(environment.apiUrl + `message/${id}`)
  }

  public setMessageToSeen(id, type){
    return this.http.post<ReqMessage>(environment.apiUrl + `seen/message/${id}/${type}`, {})
  }


  
  public getUsersWithMessages(){
    return this.http.get<User[]>(environment.apiUrl + `users/messages`).subscribe(
      users => {
        this.usersWithMessagesStore = users;
        this.usersWithMessagesChanged.next(this.usersWithMessagesStore);
      });
  }

  public getDonationsByAssociationId(id, limit){
    return this.http.get<any[]>(environment.apiUrl + `donations/association/${id}/${limit}`)
  }

  public getCountDonationsByAssociationId(id){
    return this.http.get<any[]>(environment.apiUrl + `count/donations/association/${id}`)
  }

  public updateUserById(id, item){
    return this.http.put<User>(environment.apiUrl + `user/uid/${id}`, item);
  }

  public updateProfilePicture(image:any, id:string){
    return this.http.post(environment.apiUrl + `profile/${id}`, image);
  }

  public getAssociationByCampaignId(campaign_id:string){
    return this.http.get(environment.apiUrl + `association/${campaign_id}`);
  }
}
