import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})


export class CampaignsComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  searchText;
  public pattern_url = environment.apiUrl + 'cover/';

  constructor(private campaignService:CampaignService, private donationsService:DonationsService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.campaigns = this.campaignService.campaigns; // subscribe to entire collection
    this.campaignService.getCampaigns();
  }

  onClick(id){
    this.router.navigate([`/campaign/home/${id}`]);
  }

}
