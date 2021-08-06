import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { Donation } from 'src/app/shared/models/donation.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-campaign',
  templateUrl: './top-campaign.component.html',
  styleUrls: ['./top-campaign.component.scss']
})
export class TopCampaignComponent implements OnInit {

  constructor(private campaignService:CampaignService, private donationsService:DonationsService, private ref: ChangeDetectorRef, private router:Router) { }
  public vedette:Campaign;
  donations: Observable<Donation[]>;
  public class:boolean=false;
  public time:number=5000;
  public hours:number=1;
  public pattern_url = environment.apiUrl + 'cover/'

  ngOnInit(): void {
    this.campaignService.getCampaignVedette().subscribe((res)=>{
      this.vedette = res
      this.donations = this.donationsService.donations; // subscribe to entire collection
      this.donationsService.getDonationsByCampaignId(this.vedette._id);
      // RECURSION OF SET INTERVALL FOR DONATION AND NOTIFICATIONS
      var refreshClassAndDonations = () =>{
        clearInterval(interval);
        this.class = !this.class;
        if (this.class){
          this.time = 5000
        } else {
          this.hours = this.getRandomInt(1, 5)
          this.time = this.getRandomInt(10000, 30000)
          this.donations = this.donationsService.donations; // subscribe to entire collection
          this.donationsService.getDonationsByCampaignId(this.vedette._id);
        }
        this.ref.detectChanges();
        interval = setInterval(refreshClassAndDonations, this.time);
      }
      var interval = setInterval(refreshClassAndDonations, this.time);
      
    })
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  getRandomTime() {
    let time = this.getRandomInt(1, 5)
    return `Il y a ${time} heures`
  }

  onClick(id, name){
    name = name.replace(' ', '-').toLowerCase()
    this.router.navigate([`/campaign/home/${id}/${name}`]);
  }


}
