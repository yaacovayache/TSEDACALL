import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DonationsService } from 'src/app/shared/services/donations.service';

@Component({
  selector: 'app-graphic-per-month',
  templateUrl: './graphic-per-month.component.html',
  styleUrls: ['./graphic-per-month.component.scss']
})
export class GraphicPerMonthComponent implements OnInit {
  @Input() id:string;

  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  lineChartData:ChartDataSets[] = [
    { data: [], label: 'Donations (euro) Per Month' },
  ];

  
  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private donationsService:DonationsService) { }

  ngOnInit(): void {
    this.donationsService.getStatsByMonth(this.id).subscribe((stats:any[])=>{

      stats = stats.sort(this.compare) // Sort array by month 

      for (let index in stats){
        this.lineChartData[0].data.push(stats[index].sum)
        this.months[stats[index]._id - 1] in this.lineChartLabels ? console.log("This item already exists") : this.lineChartLabels.push(this.months[stats[index]._id - 1]);
      }
    })
  }

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
