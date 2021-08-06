import { Component, OnInit,Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { Donation } from 'src/app/shared/models/donation.model';
import { User } from 'src/app/shared/models/user.model';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-donator-list',
  templateUrl: './donator-list.component.html',
  styleUrls: ['./donator-list.component.scss']
})
export class DonatorListComponent implements OnInit {
  @Input() campaign:Campaign;
  public display:boolean=false;
  pattern_url = environment.apiUrl + 'profile/'
  public searchDonators;
  public donations: Observable<Donation[]>;


  constructor(private donationsService:DonationsService) { }

  ngOnInit(): void {
    this.donations = this.donationsService.allDonations; // subscribe to entire collection
    this.donationsService.getAllDonations(this.campaign._id);      // for (let data of donators){
  }

}
