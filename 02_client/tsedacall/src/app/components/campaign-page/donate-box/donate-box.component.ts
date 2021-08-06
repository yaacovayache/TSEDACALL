import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { DonationsService } from 'src/app/shared/services/donations.service';


@Component({
  selector: 'app-donate-box',
  templateUrl: './donate-box.component.html',
  styleUrls: ['./donate-box.component.scss']
})
export class DonateBoxComponent implements OnInit {
  @Input() campaign:Campaign;
  public total:number=0;
  public months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  constructor(private donationsService:DonationsService, private campaignService:CampaignService) { }

  ngOnInit(): void {
    this.donationsService.getStatsByMonth(this.campaign._id).subscribe((stats:any[])=>{
      stats = stats.sort(this.compare) // Sort array by month 
      for (let index in stats){
        this.total += stats[index].sum
        this.lineChartData[0].data.push(stats[index].sum)
        this.months[stats[index]._id - 1] in this.lineChartLabels ? console.log("This item already exists") : this.lineChartLabels.push(this.months[stats[index]._id - 1]);
      }
    })
  }

  lineChartData:ChartDataSets[] = [
    { data: [], label: 'Donations Per Month' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: '#A748A2',
      backgroundColor: 'rgba(167,72,162,0.5)',
    },
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = "line" as const;

  compare( a, b ) {
    if ( a._id < b._id ){
      return -1;
    }
    if ( a._id > b._id ){
      return 1;
    }
    return 0;
  }
}
