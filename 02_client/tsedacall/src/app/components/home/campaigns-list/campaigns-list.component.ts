import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  searchText;
  public animationStarter = 0;
  public pattern_url = environment.apiUrl + 'cover/'

  constructor(private campaignService:CampaignService, private donationsService:DonationsService, private userService:UserService, private router:Router) { }

  
  onClick(assocation, name){
    name = name.replace(' ', '-').toLowerCase()
    assocation = assocation.replace(' ', '-').toLowerCase()
    this.router.navigate([`/${assocation}/${name}`]);
  }


  ngOnInit(): void {
    this.campaigns = this.campaignService.campaigns; // subscribe to entire collection
    this.campaignService.getCampaigns();
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin:20,
    nav: true,
    navSpeed: 700,
    navText:["<div class='nav-btn prev-slide'><</div>","<div class='nav-btn next-slide'>></div>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  }

  customOptionsMobile: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      }
    },
  }


  animationProgressBar(goal){
    return goal
  }


}
