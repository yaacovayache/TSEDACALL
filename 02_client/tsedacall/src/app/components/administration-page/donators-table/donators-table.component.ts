import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-donators-table',
  templateUrl: './donators-table.component.html',
  styleUrls: ['./donators-table.component.scss']
})
export class DonatorsTableComponent implements OnInit {
  @Input() id:string;
  public displayedDonations;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    console.log(this.id)
    this.userService.getDonationsByAssociationId(this.id).subscribe((res)=>{
      this.displayedDonations = res
    })
  }

  CerfaDownload(association){
    console.log(association)
  }

}
