import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from 'src/app/shared/models/donation.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { saveAs } from 'file-saver';
import { ExtraService } from 'src/app/shared/services/extra.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-search-cerfa',
  templateUrl: './search-cerfa.component.html',
  styleUrls: ['./search-cerfa.component.scss']
})
export class SearchCerfaComponent implements OnInit {
  public donations: Observable<Donation[]>;
  public isLoading:boolean=false;
  public mongoRequest = {}
  public paymentTypes;
  public currencies;
  public current_association;
  public current_count;

  constructor(private donationsService:DonationsService, private authService:AuthService, private extraService:ExtraService, private userService:UserService) { }

  ngOnInit(): void {
    this.current_association = this.authService.getLocalStorageUser()
    this.userService.getCountDonationsByAssociationId(this.current_association._id).subscribe((res:any)=>{
      this.current_count = res.count
    })
    this.extraService.getPaymentType().subscribe((res)=>{
      this.paymentTypes = res
    })
    this.extraService.getCurrencies().subscribe((res)=>{
      this.currencies = res
    })
  }

  onSearchByKeyword(){
    if (this.mongoRequest != {}){
    this.donations = this.donationsService.searchByFilter; // subscribe to entire collection
    this.donationsService.searchFilter(this.mongoRequest);
    } else this.donations = new Observable;
  }

  onSearchByFilter(item, value, key){
    if (key == 'createdAt'){
      if ('$gte' in item[key]) item[key]['$gte'] = new Date(value); else item[key]['$lte'] = new Date(value);
    } else if (key == 'sum'){
      if ('$gte' in item[key]) item[key]['$gte'] = parseInt(value); else item[key]['$lte'] = parseInt(value);
    }

    if (value != ''){ 
      Object.assign(this.mongoRequest, item)
    } else {
      delete this.mongoRequest[key]
    }
  }

  CerfaDownload(don){
    this.isLoading=true
    let association = this.current_association
    let data = {association: {id:association._id, name: association.associationName, address:association.address + ' ' + association.city + ', ' + association.zip, object: 'Campagne Object'},
                donator: {don_id: don._id, sum: don.amount, fname:don.fname, lname:don.lname , address: don.address + ', ' + don.city},
                date: don.date,
                campaign: {_id:don.campaign_id}
              }
    this.donationsService.downloadCerfa(data).subscribe((res)=>{
      var blob = new Blob([res], { type: 'application/pdf' });
      saveAs(blob, 'cerfa.pdf');
      this.isLoading=false
    })
  }

  csvAllDonations(){
    this.userService.getDonationsByAssociationId(this.current_association._id, 0).subscribe((res)=>{
      var options = { 
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: false, 
        useBom: true,
        noDownload: false,
        headers: ['fname', 'lname', 'email', 'amount', 'campaign_name', 'date'],
        useHeader: true,
        nullToEmptyString: true,
      };
      new AngularCsv(res, 'export', options);
    })
  }

  csvCurrentResult(){
    if (this.donations){
      this.donations.subscribe((res)=>{
        if (res){
          var options = { 
            fieldSeparator: ';',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: false, 
            useBom: true,
            noDownload: false,
            headers: ['fname', 'lname', 'email', 'amount', 'campaign_name', 'date'],
            useHeader: true,
            nullToEmptyString: true,
          };
          new AngularCsv(res, 'export', options);
        }
      })
    }

  }

}
