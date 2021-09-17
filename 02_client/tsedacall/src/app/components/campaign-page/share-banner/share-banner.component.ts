import { Component, Input, OnInit } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-banner',
  templateUrl: './share-banner.component.html',
  styleUrls: ['./share-banner.component.scss']
})
export class ShareBannerComponent implements OnInit {
  @Input() campaign:Campaign;
  public pattern_profile = environment.apiUrl + 'profile/'
  public pattern_url_campagne = environment.apiUrl + 'campaign/home/'

  constructor() { }

  ngOnInit(): void {
  }

}
