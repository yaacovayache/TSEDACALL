import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modify-campaign',
  templateUrl: './modify-campaign.component.html',
  styleUrls: ['./modify-campaign.component.scss']
})
export class ModifyCampaignComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  colors: string[] = ['blue', 'green', 'yellow', 'pink']
  selected_campaign: Campaign;
  medias;
  more: boolean = false;

  constructor(private campaignService: CampaignService, private authService: AuthService) { }

  ngOnInit(): void {
    this.campaigns = this.campaignService.campaigns; // subscribe to entire collection
    this.campaignService.getCampaignsByFounder(this.authService.getLocalStorageUser()._id);
  }

  onSelectCampaign(campaign: Campaign) {
    this.selected_campaign = campaign
    this.campaignService.getCampaignMediaName(campaign._id).subscribe((res) => {
      this.medias = res.media
      if (this.medias.length > 3)
        this.more = true;
    })
  }


  onChangeActif(id, value) {
    this.campaignService.updateCampaign({ actif: value }, id).subscribe((res: any) => {
      if (!res.error) {
        Swal.fire('Updated !', 'Field updated', 'success')
      } else {
        Swal.fire('Error', 'An error occured', 'error')
      }
    })
  }

  async newCampaign() {
    const current_user = this.authService.getLocalStorageUser()
    const steps = ['1', '2', '3', '4']
    const swalQueue:any = Swal.mixin({
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
              this.campaigns = this.campaignService.campaigns; // subscribe to entire collection
              this.campaignService.getCampaignsByFounder(this.authService.getLocalStorageUser()._id);
            })
          }
        }
      }
    }
  }

}
