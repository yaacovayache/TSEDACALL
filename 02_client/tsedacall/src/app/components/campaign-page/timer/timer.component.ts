import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() campaign:Campaign;
  @Input() maxOver:boolean;

  private subscription: Subscription;
  public dateNow = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;
  
  constructor() { }

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(x => {
      this.getTimeDifference();
    });

  }

  private getTimeDifference () {
    let dDay = new Date(this.campaign.endAt);
    this.timeDifference = dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits (timeDifference) {
    if (!this.maxOver) {
      this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
      this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
    } else {
      this.secondsToDday = 0;
      this.minutesToDday = 0;
      this.hoursToDday = 0;
      this.daysToDday = 0;
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
