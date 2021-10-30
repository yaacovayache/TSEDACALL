import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { ExtraService } from 'src/app/shared/services/extra.service';

@Component({
  selector: 'app-donate-banner',
  templateUrl: './donate-banner.component.html',
  styleUrls: ['./donate-banner.component.scss']
})
export class DonateBannerComponent implements OnInit {
  @Input() currencies:any[];
  @Input() campaign:Campaign;

  value_sum = 'euro'
  sum = ''
  multiple_month:boolean=false;
  selectedMonthNumber=2;
  sum_data = {
    'euro' : [{num:'65', symbol:'€'}, {num:'150', symbol:'€'}, {num:'300', symbol:'€'}, {num:'800', symbol:'€'}, {num:'1200', symbol:'€'}, {num:'2600', symbol:'€'}],
    'dollar' : [{num:'80', symbol:'$'}, {num:'200', symbol:'$'}, {num:'350', symbol:'$'}, {num:'850', symbol:'$'}, {num:'1300', symbol:'$'}, {num:'3000', symbol:'$'}],
    'shekel' : [{num:'200', symbol:'₪'}, {num:'600', symbol:'₪'}, {num:'1200', symbol:'₪'}, {num:'2400', symbol:'₪'}, {num:'4800', symbol:'₪'}, {num:'8000', symbol:'₪'}]}
  constructor(private extraService:ExtraService, private donationsService:DonationsService, private router:Router) { }

  ngOnInit(): void {
  }

  onChangeCurrency(value){
    switch ( value ) {
      case 'euro':
          this.value_sum = 'euro'
          break;
      case 'dollar':
        this.value_sum = 'dollar'
          break;
      case 'shekel':
        this.value_sum = 'shekel'
          break;
      default: 
        this.value_sum = 'euro'
          break;
   }
  }

  onClickSum(value){
    this.sum = value;
  }

  onClickMultipleMonth(value){
    this.multiple_month = value;
  }

  public onChangeNumberMonth(value){
    this.selectedMonthNumber=value
  }

  sendDonation(){
    this.donationsService.isMultipleShared = this.multiple_month;
    this.donationsService.sumShared = this.sum;
    this.donationsService.monthNumberShared = this.selectedMonthNumber;
    this.router.navigate([`/donation/form/${this.campaign._id}`]);
  }

}
