import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  constructor(private http: HttpClient) { }


  public getPaymentType(){
    return this.http.get<any[]>(environment.apiUrl + `payment-type`)
  }

  public getCurrencies(){
    return this.http.get<any[]>(environment.apiUrl + `currency`)
  }

  public getCountries(){
    return this.http.get<Country[]>(environment.apiUrl + `country`)
  }

}
