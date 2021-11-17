import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { UserService } from 'src/app/shared/services/user.service';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() association: User;
  public pattern_url = environment.apiUrl + 'profile/';

  constructor(private router:Router, private userService: UserService,
    private campaignService: CampaignService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  nav(path){
    this.router.navigate([path]);
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

  async newCampaign() {
    const current_user = this.authService.getLocalStorageUser();
    const steps = ['1', '2', '3', '4'];
    const swalQueue: any = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
    })
    const { value: name } = await swalQueue.fire({ title: 'Name', input: 'text', inputValidator: (value) => { if (!value) return 'Incorrect value'}, currentProgressStep: 0 })
    if (name){
      const { value: description } =  await swalQueue.fire({ title: 'Description', input: 'textarea', inputPlaceholder: 'Enter your description here...', inputValidator: (value) => { if (!value) return 'Incorrect value'}, currentProgressStep: 1 })
      if (description){
        const { value: goal } = await swalQueue.fire({ title: 'Goal', input: 'number', inputPlaceholder: '0.00', inputValidator: (value) => { if (!value) return 'Incorrect value'}, currentProgressStep: 2})
        if (goal){
          const { value: endDate } = await swalQueue.fire({ title: 'Expiry Date', html: '<input type="date" class="swal2-input" id="expiry-date">', currentProgressStep: 3, preConfirm: () => { return (<HTMLInputElement>document.getElementById('expiry-date')).value}, confirmButtonText: 'OK' })
          if (endDate){
            this.campaignService.createCampaign({name:name, description:description, goal:goal, endAt:endDate, founder_id:current_user._id, associationName:current_user.associationName}).subscribe((res)=>{
              this.router.navigate(['administration/modif']);
            })
          }
        }
      }
    }
  }



}
