import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss']
})
export class DonationFormComponent implements OnInit {
  public donationForm: FormGroup;
  public association;
  public campaign_id:string;
  public deductionFiscale = 0;
  constructor(private route:ActivatedRoute, private campaignService:CampaignService, private userService:UserService) { }

  ngOnInit(): void {
    this.campaign_id = this.route.snapshot.paramMap.get('campaign_id')
    this.userService.getAssociationByCampaignId(this.campaign_id).subscribe((association)=>{
      this.association = association
    })
    this.donationForm = new FormGroup({
      multiple: new FormControl(false, Validators.required),
      sum: new FormControl(0.00, Validators.required),
      message: new FormControl(''),
      type_donator: new FormControl('Particular', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      telephone: new FormControl(''),
      anonymous: new FormControl(false, Validators.required),
      type_payment: new FormControl('creditCard', Validators.required),
      creditCard: new FormControl(true),
      cardNumber: new FormControl(''),
      cvc: new FormControl(''),
      cardExpiration: new FormControl(''),
      bank: new FormControl(false),
      bankAccountName: new FormControl(''),
      emailAccountName: new FormControl(''),
      iban: new FormControl(''),
    });
  }

  public onChangeMultiple(value){
    this.donationForm.controls['multiple'].setValue(value);
  }

  public onChangePaymentType(value){
    this.donationForm.controls['type_payment'].setValue(value);
  }

  public onChangeAnonymous(value){
    this.donationForm.controls['anonymous'].setValue(value);
  }

  public onChangeDonatorType(value){
    this.donationForm.controls['type_donator'].setValue(value);
  }

  public onChangeDeductionFiscale(){
    this.deductionFiscale = this.donationForm.controls['sum'].value * 0.70;
  }

  public onSubmit() {
    console.log(this.donationForm.controls)
  }
}
