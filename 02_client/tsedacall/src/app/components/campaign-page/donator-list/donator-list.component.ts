import { Component, OnInit,Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/shared/models/user.model';
import { DonationsService } from 'src/app/shared/services/donations.service';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-donator-list',
  templateUrl: './donator-list.component.html',
  styleUrls: ['./donator-list.component.scss']
})
export class DonatorListComponent implements OnInit {
  @Input() id:string;
  public display:boolean=false;
  constructor(private donationsService:DonationsService) { }

  ngOnInit(): void {
    this.donationsService.getDonatorsByCampaignId(this.id).subscribe((donators:any[])=>{
      for (let data of donators){
        ELEMENT_DATA.push({fname: data.fname, lname: data.lname, email: data.email, isRegisteredStr: (data.isRegistered) ? 'check' : 'close', message: data.message})
      }
      this.display=true
    })
  }
  
  displayedColumns: string[] = ['fname', 'lname', 'email', 'isRegistered', 'message'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
