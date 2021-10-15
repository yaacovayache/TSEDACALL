import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { ExtraService } from 'src/app/shared/services/extra.service';


@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {
  campaign:Campaign;
  maxOver:boolean = false;
  public currencies;


  constructor(private route:ActivatedRoute, private campaignService:CampaignService, private extraService:ExtraService) { }

  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('assocation') + '/' + this.route.snapshot.paramMap.get('name')
    
    this.campaignService.getCampaignByUrl(url).subscribe((campaign)=>{
      this.campaign = campaign
      if ((this.campaign.totalSum/this.campaign.goal)*100 >= 100)
        this.maxOver=true;
    })
    this.extraService.getCurrencies().subscribe((res)=>{
      this.currencies = res
    })
  }

}
