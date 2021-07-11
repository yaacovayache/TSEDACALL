import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DonationsService } from 'src/app/shared/services/donations.service';


@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.scss']
})
export class CampaignPageComponent implements OnInit {
  campaign:Campaign;
  id:string;


  constructor(private route:ActivatedRoute, private campaignService:CampaignService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.campaignService.getCampaignById(this.id).subscribe((campaign)=>{
      this.campaign = campaign
    })
  }

}
