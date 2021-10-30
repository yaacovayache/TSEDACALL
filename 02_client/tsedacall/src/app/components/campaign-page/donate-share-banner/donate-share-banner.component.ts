import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign.model';

@Component({
  selector: 'app-donate-share-banner',
  templateUrl: './donate-share-banner.component.html',
  styleUrls: ['./donate-share-banner.component.scss']
})
export class DonateShareBannerComponent implements OnInit {
  @Input() campaign:Campaign;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onClickDonationForm(id){
    this.router.navigate([`/donation/form/${id}`]);
  }


}
