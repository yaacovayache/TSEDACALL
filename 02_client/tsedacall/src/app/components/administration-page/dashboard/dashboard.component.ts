import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() association:User;
  public pattern_url = environment.apiUrl + 'profile/'

  constructor(private router:Router) { }
  

  ngOnInit(): void {
  }

  navAddDonation(){
    this.router.navigate([`add`]);
  }

  navSearchCerfa(){
    this.router.navigate([`search`]);
  }

}
