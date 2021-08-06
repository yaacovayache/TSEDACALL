import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  @Input() campaign:Campaign;
  id_campaign;
  pattern_url = environment.apiUrl + 'media/'
  carouselItems;

  constructor(private campaignService:CampaignService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.campaignService.getCampaignMediaName(this.campaign._id).subscribe((res)=>{
      this.carouselItems = res.media
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: false,
    navSpeed: 700,
    navText:["<div class='nav-btn prev-slide'><</div>","<div class='nav-btn next-slide'>></div>"],
    responsive: {
      0: {
        items: 1
      }
    },
  }

}
