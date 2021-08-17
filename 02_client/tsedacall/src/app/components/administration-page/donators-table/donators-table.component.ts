import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-donators-table',
  templateUrl: './donators-table.component.html',
  styleUrls: ['./donators-table.component.scss']
})
export class DonatorsTableComponent implements OnInit {
  @Input() id:string;
  public displayedDonations;
  public isLoading:boolean = false;
  constructor(private userService:UserService, private authService:AuthService, private donationsService:DonationsService) { }

  ngOnInit(): void {
    console.log(this.id)
    this.userService.getDonationsByAssociationId(this.id).subscribe((res)=>{
      this.displayedDonations = res
    })
  }

  CerfaDownload(don){
    this.isLoading=true
    let association = this.authService.getLocalStorageUser()
    let data = {association: {id:association._id, name: association.associationName, address:association.address + ' ' + association.city + ', ' + association.zip, object: 'Campagne Object'},
                donator: {sum: don.sum, fname:don.fname, lname:don.lname , address: don.address + ', ' + don.city},
                date: don.date,
                campaign: {_id:don.campaign_id}
              }
    this.donationsService.downloadCerfa(data).subscribe((res)=>{
      console.log(res)
      var blob = new Blob([res], { type: 'application/pdf' });
      saveAs(blob, 'cerfa.pdf');
      this.isLoading=false
    })
  }

}
