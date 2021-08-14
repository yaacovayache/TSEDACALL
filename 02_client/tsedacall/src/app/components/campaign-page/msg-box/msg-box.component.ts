import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { Donation } from 'src/app/shared/models/donation.model';
import { DonationsService } from 'src/app/shared/services/donations.service';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.scss']
})
export class MsgBoxComponent implements OnInit, OnDestroy {
  @Input() campaign:Campaign;
  donations: Observable<Donation[]>;
  public fadeClass = 'fadein'
  public intervalTime = 5000
  public hours:number=1;
  public interval;
  constructor(private ref: ChangeDetectorRef, private donationsService:DonationsService) { }

  ngOnInit(): void {
    this.donations = this.donationsService.donations; // subscribe to entire collection
    this.donationsService.getDonationsByCampaignId(this.campaign._id);
    var refreshClassAndDonations = () =>{
      clearInterval(this.interval);
      if (this.fadeClass == 'fadein'){
        this.fadeClass = 'fadeout'
        this.intervalTime = 10000
      } else {
        this.donations = this.donationsService.donations; // subscribe to entire collection
        this.donationsService.getDonationsByCampaignId(this.campaign._id);
        this.fadeClass = 'fadein'
        this.intervalTime = 5000
      }
      this.ref.detectChanges();
      this.interval = setInterval(refreshClassAndDonations, this.intervalTime);
    }
    this.interval = setInterval(refreshClassAndDonations, this.intervalTime);
  }


  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
