import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { saveAs } from 'file-saver';
import { User } from 'src/app/shared/models/user.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-donators-table',
  templateUrl: './donators-table.component.html',
  styleUrls: ['./donators-table.component.scss']
})
export class DonatorsTableComponent implements OnInit {
  @Input() association:User;
  public modalRef: BsModalRef;
  public displayedDonations;
  public allDonations;
  public searchText;
  public isLoading:boolean = false;
  constructor(private userService:UserService, private authService:AuthService, private modalService: BsModalService, private donationsService:DonationsService) { }

  ngOnInit(): void {
    this.userService.getDonationsByAssociationId(this.association._id, 5).subscribe((res)=>{
      this.displayedDonations = res
      console.log(this.displayedDonations)
    })

    this.userService.getDonationsByAssociationId(this.association._id, 0).subscribe((res)=>{
      this.allDonations = res
    })
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));  
  } 

  cerfaDownload(don){
    this.isLoading=true
    // let association = this.authService.getLocalStorageUser()
    let data = {association: {id:this.association._id, name: this.association.associationName, address:this.association.address + ' ' + this.association.city + ', ' + this.association.zip, object: 'Campagne Object'},
                donator: {don_id: don._id, sum: don.amount, fname:don.fname, lname:don.lname , address: don.address + ', ' + don.city},
                date: don.date,
                campaign: {_id:don.campaign_id}
              }
    this.donationsService.downloadCerfa(data).subscribe((res)=>{
      var blob = new Blob([res], { type: 'application/pdf' });
      saveAs(blob, 'cerfa.pdf');
      this.isLoading=false
    })
  }

}
