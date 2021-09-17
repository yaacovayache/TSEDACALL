import { Component, OnInit, Input } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.scss']
})
export class AssociationComponent implements OnInit {
  @Input() campaign:Campaign;
  public pattern_url = environment.apiUrl + 'profile/'

  constructor(private campaignService:CampaignService, private userService:UserService) { }

  ngOnInit(): void {
  }

}
