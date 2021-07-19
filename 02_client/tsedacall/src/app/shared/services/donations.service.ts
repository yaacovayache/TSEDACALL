import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  constructor(private http: HttpClient) { }

  public getStatsByMonth(id){
    return this.http.get(environment.apiUrl + `stats/donations/month/${id}`)
  }

  public getDonatorsByCampaignId(id){
    return this.http.get(environment.apiUrl + `donators/campaign/${id}`)
  }

  public currentSumByCampaignId(id){
    return this.http.get(environment.apiUrl + `donations/campaign/${id}`)
  }
  
}
