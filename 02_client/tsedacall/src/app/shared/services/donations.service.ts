import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  constructor(private http: HttpClient) { }

  donationsStore:Donation[] = [];
  donationsChanged = new BehaviorSubject<Donation[]>([]);
  readonly donations = this.donationsChanged.asObservable();

  allDonationsStore:Donation[] = [];
  allDonationsChanged = new BehaviorSubject<Donation[]>([]);
  readonly  allDonations = this.allDonationsChanged.asObservable();

  public getStatsByMonth(id){
    return this.http.get(environment.apiUrl + `stats/donations/month/${id}`)
  }

  public getStatsByDay(id){
    return this.http.get(environment.apiUrl + `stats/donations/day/${id}`)
  }

  public getDonatorsByCampaignId(id){
    return this.http.get(environment.apiUrl + `donators/campaign/${id}`)
  }

  public currentSumByCampaignId(id){
    return this.http.get(environment.apiUrl + `donations/campaign/${id}`)
  }

  public getDonationsByCampaignId(id){
    return this.http.get<Donation[]>(environment.apiUrl + `dons/campaign/${id}`).subscribe(
      donations => {
        this.donationsStore = donations;
        this.donationsChanged.next(this.donationsStore);
      });
  }

  public getAllDonations(id){
    return this.http.get<Donation[]>(environment.apiUrl + `all/donations/campaign/${id}`).subscribe(
      donations => {
        this.allDonationsStore = donations;
        this.allDonationsChanged.next(this.allDonationsStore);
      });
  }
  
}
