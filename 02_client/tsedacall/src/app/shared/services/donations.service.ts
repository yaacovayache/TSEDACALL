import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../models/donation.model';
import { NumberToWordsPipe } from 'src/app/shared/pipes/number-to-word.pipe';
import { ToWords } from 'to-words';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  constructor(private http: HttpClient, private pipeNumberToWords: NumberToWordsPipe) { }
  public toWords = new ToWords({localeCode: 'fr-FR', converterOptions: {currency: true, ignoreDecimal: false,ignoreZeroCurrency: false,}});

  public sumShared;
  public isMultipleShared:boolean;
  public monthNumberShared;

  donationsStore:Donation[] = [];
  donationsChanged = new BehaviorSubject<Donation[]>([]);
  readonly donations = this.donationsChanged.asObservable();

  allDonationsStore:Donation[] = [];
  allDonationsChanged = new BehaviorSubject<Donation[]>([]);
  readonly  allDonations = this.allDonationsChanged.asObservable();

  searchByFilterStore:Donation[] = [];
  searchByFilterChanged = new BehaviorSubject<Donation[]>([]);
  readonly  searchByFilter = this. searchByFilterChanged.asObservable();


  public addDonation(item){
    return this.http.post<Donation>(environment.apiUrl + `payment`, item)
  }

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

  public downloadCerfa(item){
    item.donator.sumWords = this.toWords.convert(item.donator.sum)
    return this.http.post(environment.apiUrl + `cerfa`, item, { responseType: 'blob' });
  }

  public sendCerfaByMail(item){
    item.cerfa.donator.sumWords = this.toWords.convert(item.cerfa.donator.sum)
    return this.http.post(environment.apiUrl + `cerfa/mail`, item);
  }

  public searchFilter(item){
    return this.http.post<Donation[]>(environment.apiUrl + `donations/filter`, {query: item}).subscribe(
      donations => {
        this. searchByFilterStore = donations;
        this.searchByFilterChanged.next(this.searchByFilterStore);
      });
  }

  public getCsvFromQuery(item, filter){
    return this.http.post(environment.apiUrl + `donations/export`, {query: item, filter:filter})
  }

  public createStripeCustomer(item){
    return this.http.post(environment.apiUrl + `stripe/customer`, item)
  }

  public createStripeInvoicePayment(item){
    return this.http.post(environment.apiUrl + `stripe/invoice/payment`, item)
  }

  
  public createStripePayment(item){
    return this.http.post(environment.apiUrl + `stripe/checkout`, item)
  }

  public createStripeSepaPayment(item){
    return this.http.post(environment.apiUrl + `stripe/iban`, item)
  }

  public createStripeSubscription(item){
    return this.http.post(environment.apiUrl + `stripe/subscription`, item)
  }
  
}
