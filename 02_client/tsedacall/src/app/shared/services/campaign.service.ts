import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Campaign } from '../models/campaign.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
readonly rootUrl = window.location.protocol + '//' + window.location.hostname + ':3000/';

  campaignsStore:Campaign[] = [];
  campaignsChanged = new BehaviorSubject<Campaign[]>([]);
  readonly campaigns = this.campaignsChanged.asObservable();

  constructor(private http: HttpClient) { }

  public getCampaigns(){
    return this.http.get<Campaign[]>(this.rootUrl + 'campaign').subscribe(
      campaigns => {
        console.log(campaigns)
        this.campaignsStore = campaigns;
        this.campaignsChanged.next(this.campaignsStore);
      });
  }

  public getCampaignById(id){
    return this.http.get<Campaign>(this.rootUrl + `campaign/${id}`)
  }
}
