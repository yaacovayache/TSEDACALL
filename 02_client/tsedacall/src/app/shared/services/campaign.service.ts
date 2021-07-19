import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Campaign } from '../models/campaign.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  campaignsStore:Campaign[] = [];
  campaignsChanged = new BehaviorSubject<Campaign[]>([]);
  readonly campaigns = this.campaignsChanged.asObservable();

  constructor(private http: HttpClient) { }

  public getCampaigns(){
    return this.http.get<Campaign[]>(environment.apiUrl+ 'campaign').subscribe(
      campaigns => {
        console.log(campaigns)
        this.campaignsStore = campaigns;
        this.campaignsChanged.next(this.campaignsStore);
      });
  }

  public getCampaignById(id){
    return this.http.get<Campaign>(environment.apiUrl + `campaign/${id}`)
  }

  public getCampaignsByFounder(id){
    return this.http.get<Campaign[]>(environment.apiUrl + `campaigns/founder/${id}`)
  }
}
