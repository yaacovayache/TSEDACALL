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
  private campaignId;
  campaignsChanged = new BehaviorSubject<Campaign[]>([]);
  readonly campaigns = this.campaignsChanged.asObservable();

  constructor(private http: HttpClient) { }

  set campaignToGet(campaignId) {
    this.campaignId = campaignId;
  }

  get campaignToGet() {
    return this.campaignId;
  }

  public getCampaigns(){
    return this.http.get<Campaign[]>(environment.apiUrl+ 'campaign').subscribe(
      campaigns => {
        this.campaignsStore = campaigns;
        this.campaignsChanged.next(this.campaignsStore);
      });
  }

  public getCampaignsByFounder(id){
    return this.http.get<Campaign[]>(environment.apiUrl + `campaigns/founder/${id}`).subscribe(
      campaigns => {
        this.campaignsStore = campaigns;
        this.campaignsChanged.next(this.campaignsStore);
      });
  }

  public getCampaignById(id){
    return this.http.get<Campaign>(environment.apiUrl + `campaign/${id}`)
  }

  public getCampaignByUrl(url){
    return this.http.post<Campaign>(environment.apiUrl + `campaign/byurl`, {url:url})
  }

  public getCampaignMediaName(id){
    return this.http.get<any>(environment.apiUrl + `media/name/${id}`)
  }

  public getCampaignVedette(){
    return this.http.get<any>(environment.apiUrl + `campaign/find/top`)
  }

  public addMedia(image:any, id:string){
    return this.http.post(environment.apiUrl + `add/media/${id}`, image);
  }

  public deleteMedia(name:string, id:string){
    return this.http.post(environment.apiUrl + `delete/media/${id}/${name}`, {});
  }
  
  public updateCampaign(item:any, id:string){
    return this.http.put(environment.apiUrl + `campaign/${id}`, item);
  }

  public createCampaign(item){
    return this.http.post(environment.apiUrl + `campaign`, item);
  }

  public updateCover(image:any, id:string){
    return this.http.post(environment.apiUrl + `add/cover/${id}`, image);
  }
}
