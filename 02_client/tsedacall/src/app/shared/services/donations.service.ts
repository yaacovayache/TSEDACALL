import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  readonly rootUrl = window.location.protocol + '//' + window.location.hostname + ':3000/';

  constructor(private http: HttpClient) { }

  public getStatsByMonth(id){
    return this.http.get(this.rootUrl + `stats/donations/month/${id}`)
  }

  public getDonatorsByCampaignId(id){
    return this.http.get(this.rootUrl + `donators/campaign/${id}`)
  }

  public currentSumByCampaignId(id){
    return this.http.get(this.rootUrl + `donations/campaign/${id}`)
  }
  
}
