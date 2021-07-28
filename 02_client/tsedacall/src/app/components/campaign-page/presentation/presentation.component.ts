import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  @Input() campaign:Campaign;
  id_campaign;
  pattern_url = environment.apiUrl + 'media/'
  media;
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }
  carouselItems = [1, 2, 3];

  constructor(private campaignService:CampaignService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_campaign = this.route.snapshot.paramMap.get('id')
    console.log(this.id_campaign)
    this.campaignService.getCampaignMediaName(this.id_campaign).subscribe((res)=>{
      this.carouselItems = res.media
      console.log(this.media)
    })
  }

}
