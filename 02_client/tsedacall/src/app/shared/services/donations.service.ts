import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  // readonly rootUrl = window.location.protocol + '//' + window.location.hostname + ':3000/';
  // readonly rootUrl = 'http://178.18.246.119:3000/';
  constructor(private http: HttpClient) { }

  public ROOT_URL(){
    return 'http://localhost:3000/' 
  }

  public getStatsByMonth(id){
    return this.http.get(this.ROOT_URL() + `stats/donations/month/${id}`)
  }

  public getDonatorsByCampaignId(id){
    return this.http.get(this.ROOT_URL() + `donators/campaign/${id}`)
  }

  public currentSumByCampaignId(id){
    return this.http.get(this.ROOT_URL() + `donations/campaign/${id}`)
  }
  
}
