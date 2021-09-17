import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-create-or-search',
  templateUrl: './create-or-search.component.html',
  styleUrls: ['./create-or-search.component.scss']
})
export class CreateOrSearchComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;

  public associations: Observable<User[]>;
  public pattern_url = environment.apiUrl + 'profile/'
  public searchText;
  public currentCampaign:Observable<Campaign[]>;
  public campaignFlag = false;
  constructor(private router:Router, private userService:UserService, private campaignService:CampaignService) { }

  ngOnInit(): void {
    this.associations = this.userService.associations; // subscribe to entire collection
    this.userService.getAssociations();
  }

  onNavigation(id){
    this.modal.nativeElement.click();
    this.router.navigate([`/campaign/home/${id}`]);
  }

  onClickAssociation(id){
    this.currentCampaign = this.campaignService.campaigns; // subscribe to entire collection
    this.campaignService.getCampaignsByFounder(id);
    this.campaignFlag = true;
  }

  previousAssociation(){
    this.currentCampaign = new Observable<Campaign[]>();
    this.campaignFlag = false;
  }

}
