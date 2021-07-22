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
    text: `home.how-it-work.first.text`,
    title: 'home.how-it-work.first.title',
    button: 'form.Start'
  }, {
    icon: 'person',
    text: `home.how-it-work.second.text`,
    title: 'home.how-it-work.second.title',
    button: 'form.Start'
  }, {
    icon: 'storage',
    text: `home.how-it-work.third.text`,
    title: 'home.how-it-work.third.title',
    button: 'form.LearnMore'
  }, {
    icon: 'enhanced_encryption',
    text: `home.how-it-work.fourth.text`,
    title: 'home.how-it-work.fourth.title',
    button: 'form.LearnMore'
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
