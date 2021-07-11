import { Component, OnInit, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  public carouselOptions: NguCarouselConfig;
  public services = [{
    icon: 'people',
    text: `Create your charity's raising page and give to your community the option to make one-time or monthly donations. You can also manage all your tax receipt for free.`,
    title: 'You are a charity',
    button: 'Start NOW'
  }, {
    icon: 'person',
    text: `Double your donation, possibility of paying the donation in several installments, possibility of creating a team in order to carry out your campaign objective.`,
    title: 'You are a donor',
    button: 'Start NOW'
  }, {
    icon: 'storage',
    text: `Set your goal, start the countdown, if your campaign reaches its goal in time a Matcher will double the amount already raised ! Find new donors, manage your tax receipts for free, get your donations instantly.`,
    title: 'Why use TsedaCall',
    button: 'Learn more'
  }, {
    icon: 'enhanced_encryption',
    text: `We care deeply about how your organization is viewed by your donors and  your community. We take responsability for building a foundation of trust by enhancing and protecting your mission, brand and governance rules.`,
    title: 'Why donate with TsedaCall',
    button: 'Learn more'
  }]
  
  constructor() { }

  ngOnInit() {
    this.carouselOptions = {
      grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      interval: {timing: 4000},
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    }
  }


}
