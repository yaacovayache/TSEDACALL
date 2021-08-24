import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() association:User;
  public pattern_url = environment.apiUrl + 'profile/'

  constructor(private router:Router, private userService:UserService) { }
  

  ngOnInit(): void {
  }

  navAddDonation(){
    this.router.navigate([`add`]);
  }

  navSearchCerfa(){
    this.router.navigate([`search`]);
  }

  csvAllDonations(){
    this.userService.getDonationsByAssociationId(this.association._id, 0).subscribe((res)=>{
      var options = { 
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: false, 
        useBom: true,
        noDownload: false,
        headers: ['fname', 'lname', 'email', 'amount', 'campaign_name', 'date'],
        useHeader: true,
        nullToEmptyString: true,
      };
      new AngularCsv(res, 'export', options);
    })
  }

}
