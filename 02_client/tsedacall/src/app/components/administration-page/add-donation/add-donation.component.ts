import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { ExtraService } from 'src/app/shared/services/extra.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.scss']
})
export class AddDonationComponent implements OnInit {
  public donationForm: FormGroup;
  campaigns: Observable<Campaign[]>;
  public sendCerfa: boolean = false;
  public formsData;
  public paymentTypes;
  public currencies;
  public isLoading: boolean = false;
  public default = { label: 'Veuillez sélectionner une campagne', value: '' }



  constructor(private router: Router, private toastr: ToastrService, private donationsService: DonationsService, private campaignService: CampaignService, private authService: AuthService, private extraService: ExtraService) { }

  showSuccess() {
    this.toastr.success('Success');
  }

  showError() {
    this.toastr.error('Forms incomplet');
  }

  back(): void {
    this.router.navigate([`administration`]);
  }

  ngOnInit(): void {
    this.campaigns = this.campaignService.campaigns; // subscribe to entire collection
    this.campaignService.getCampaignsByFounder(this.authService.getLocalStorageUser()._id);
    this.extraService.getPaymentType().subscribe((res) => {
      this.paymentTypes = res
    })
    this.extraService.getCurrencies().subscribe((res) => {
      this.currencies = res
    })
    this.donationForm = new FormGroup({
      type_donator: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      telephone: new FormControl(''),
      sum: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      type_payment: new FormControl('', Validators.required),
      anonymous: new FormControl(false, Validators.required),
      campaignId: new FormControl('', Validators.required),
      message: new FormControl(''),
    });
  }

  onSubmit() {
    this.isLoading = true
    this.formsData = {
      type_donator: this.donationForm.get('type_donator').value,
      email: this.donationForm.get('email').value,
      fname: this.donationForm.get('fname').value,
      lname: this.donationForm.get('lname').value,
      address: this.donationForm.get('address').value,
      zip: this.donationForm.get('zip').value,
      country: this.donationForm.get('country').value,
      city: this.donationForm.get('city').value,
      telephone: this.donationForm.get('telephone').value,
      sum: this.donationForm.get('sum').value,
      currency: this.donationForm.get('currency').value,
      type_payment: this.donationForm.get('type_payment').value,
      anonymous: JSON.parse(this.donationForm.get('anonymous').value),
      campaignId: this.donationForm.get('campaignId').value,
      message: this.donationForm.get('message').value,
      manually: true
    }
    if (this.donationForm.valid) {
      this.donationsService.addDonation(this.formsData).subscribe((res) => {
        console.log(res)
        if (this.sendCerfa) {
          let association = this.authService.getLocalStorageUser()
          let data = {
            association: { id: association._id, name: association.associationName, address: association.address + ' ' + association.city + ', ' + association.zip, object: 'Campagne Object' },
            donator: { don_id: res._id, sum: this.formsData.sum, fname: this.formsData.fname, lname: this.formsData.lname, address: this.formsData.address + ', ' + this.formsData.city },
            date: (new Date()).toString(),
            campaign: { _id: this.formsData.campaignId }
          }
          this.donationsService.sendCerfaByMail({ cerfa: data, email: this.formsData.email }).subscribe((res) => { })
        }

        this.donationForm.reset();
        this.showSuccess()
        this.isLoading = false
      })

    } else {
      this.isLoading = false
      this.showError()
    }
  }

}
