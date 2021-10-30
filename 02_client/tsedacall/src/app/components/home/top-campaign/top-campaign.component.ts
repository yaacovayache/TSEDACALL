import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
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
export class TopCampaignComponent implements OnInit, OnDestroy {

  constructor(private campaignService:CampaignService, private donationsService:DonationsService, private ref: ChangeDetectorRef, private router:Router) { }
  public vedette:Campaign;
  donations: Observable<Donation[]>;
  public class:boolean=false;
  public time:number=5000;
  public hours:number=1;
  public pattern_url = environment.apiUrl + 'cover/'
  public interval;

  ngOnInit(): void {
    this.campaignService.getCampaignVedette().subscribe((res)=>{
      this.vedette = res
      this.donations = this.donationsService.donations; // subscribe to entire collection
      this.donationsService.getDonationsByCampaignId(this.vedette._id);
      
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

  onClick(assocation, name){
    name = name.replace(' ', '-').toLowerCase()
    assocation = assocation.replace(' ', '-').toLowerCase()
    this.router.navigate([`/${assocation}/${name}`]);
  }

  onClickDonationForm(id){
    console.log(id)
    this.router.navigate([`/donation/form/${id}`]);
  }


  ngOnDestroy() {
    // if (this.interval) {
    //   clearInterval(this.interval);
    // } 
  }

}
