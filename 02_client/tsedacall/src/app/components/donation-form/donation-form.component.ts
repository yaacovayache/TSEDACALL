import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { DonationsService } from 'src/app/shared/services/donations.service';
import { ExtraService } from 'src/app/shared/services/extra.service';
import { UserService } from 'src/app/shared/services/user.service';

import { StripeService, StripeCardComponent, StripeIbanComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeIbanElementOptions, CreateTokenIbanData, StripeElementsOptions, PaymentIntent, PaymentRequestPaymentMethodEvent, PaymentRequestShippingAddressEvent, StripeElement, StripeCardElement } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.scss']
})
export class DonationFormComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild(StripeIbanComponent) iban: StripeIbanComponent;


  public donationForm: FormGroup;
  public association;
  public token;
  public isLoading:boolean=false;
  public campaign_id: string;
  public deductionFiscale = 0;
  public multiple: boolean = false;
  public transfer: boolean = false;
  public currencies;
  public countries;
  public selectedMonthNumber = 2;
  public element: StripeCardElement;

  cardOptions: StripeCardElementOptions = { style: { base: { iconColor: '#666EE8', color: '#31325F', fontWeight: '300', fontFamily: '"Helvetica Neue", Helvetica, sans-serif', fontSize: '18px', '::placeholder': { color: '#CFD7E0' }} }};

  ibanOptions: StripeIbanElementOptions = { supportedCountries: ['SEPA'],  style: { base: { iconColor: '#666EE8', color: '#31325F', fontWeight: '300', fontFamily: '"Helvetica Neue", Helvetica, sans-serif', fontSize: '18px', '::placeholder': { color: '#CFD7E0' }} }};

  elementsOptions: StripeElementsOptions = { locale: 'fr' };


  constructor(private route: ActivatedRoute, private router:Router, private extraService: ExtraService, private donationsService: DonationsService, private userService: UserService, private authService: AuthService, private stripeService: StripeService) { }

  ngOnInit(): void {
    this.extraService.getCurrencies().subscribe((res) => {
      this.currencies = res
    })
    this.extraService.getCountries().subscribe((res) => {
      this.countries = res
    })
    this.campaign_id = this.route.snapshot.paramMap.get('campaign_id')
    this.userService.getAssociationByCampaignId(this.campaign_id).subscribe((association) => {
      console.log(association)
      this.association = association
    })
    this.donationForm = new FormGroup({
      multiple: new FormControl(false, Validators.required),
      sum: new FormControl(0.00, Validators.required),
      currency: new FormControl('eur', Validators.required),
      message: new FormControl(''),
      type_donator: new FormControl('Particular', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      telephone: new FormControl(''),
      anonymous: new FormControl(false, Validators.required),
      type_payment: new FormControl('creditCard', Validators.required),
      name_account: new FormControl(''),
      email_account: new FormControl(''),
    });

    this.donationForm.controls['sum'].setValue(this.donationsService.sumShared);
    this.donationForm.controls['multiple'].setValue(this.donationsService.isMultipleShared);
    this.multiple = this.donationsService.isMultipleShared
    if (this.multiple) this.selectedMonthNumber = this.donationsService.monthNumberShared
  }

  public onChangeMultiple(bool) {
    this.multiple = bool;
    this.donationForm.controls['multiple'].setValue(bool);
    if (this.multiple) this.donationForm.controls['type_payment'].setValue('monthlyTransfer');
  }

  public onChangeNumberMonth(value) {
    this.selectedMonthNumber = value
  }

  public onChangePaymentType(value, bool) {
    this.transfer = bool
    console.log(this.multiple)
    if (this.multiple) this.donationForm.controls['type_payment'].setValue('monthlyTransfer');
    else this.donationForm.controls['type_payment'].setValue(value);
    console.log(this.donationForm.controls['type_payment'].value)
  }

  public onChangeAnonymous(value) {
    this.donationForm.controls['anonymous'].setValue(value);
  }

  public onChangeDonatorType(value) {
    this.donationForm.controls['type_donator'].setValue(value);
  }

  public onChangeCurrency(value) {
    this.donationForm.controls['currency'].setValue(value);
  }

  public onChangeCountry(value) {
    this.donationForm.controls['country'].setValue(value);
  }

  public onChangeDeductionFiscale() {
    this.deductionFiscale = this.donationForm.controls['sum'].value * 0.70;
  }

  public async onSubmit() {
    this.isLoading = true
    let registered = (this.authService.getLocalStorageUser())? true:false
    const formsData:any = {
      fname: this.donationForm.get('fname').value,
      lname: this.donationForm.get('lname').value,
      email: this.donationForm.get('email').value,
      telephone: this.donationForm.get('telephone').value,
      address: (this.donationForm.get('address').value).trim(),
      zip: this.donationForm.get('zip').value,
      city: this.donationForm.get('city').value,
      country: this.donationForm.get('country').value,
      multiple: (this.donationForm.get('multiple').value) ? this.donationForm.get('multiple').value : false ,
      sum: this.donationForm.get('sum').value,
      currency: this.donationForm.get('currency').value,
      message: this.donationForm.get('message').value,
      type_donator: this.donationForm.get('type_donator').value,
      anonymous: this.donationForm.get('anonymous').value,
      type_payment: this.donationForm.get('type_payment').value,
      campaignId: this.campaign_id,
      isRegistered: registered
    }
    if (registered) formsData.userId = this.authService.getLocalStorageUser()._id
    if (this.transfer){
      formsData.name_account = this.donationForm.get('name_account').value,
      formsData.email_account= this.donationForm.get('email_account').value
      formsData.payment_method_types = 'sepa_debit'
      this.paymentSEPACreation(formsData)
    } else {
      formsData.payment_method_types = 'card'
      this.createToken(formsData, this.card)
    }
    
  }


  paymentSEPACreation(formData){
    this.stripeService.createPaymentMethod({
      type: 'sepa_debit',
      sepa_debit:this.iban.element,
      billing_details: {
        name: formData.fname + ' ' + formData.lname,
        address:{ line1: formData.address, city: formData.city, postal_code: formData.zip, country: formData.country },
        email:formData.email
      },
    })
    .subscribe((result) => {
      console.log(result)
      if (result.paymentMethod) {
        this.paymentProcess(result, formData)
      } else if (result.error) {
        this.isLoading = false;
        console.log(result.error.message);
      }
    });
  }


  paymentCardCreation(formData){
    formData.client_ip = this.token.client_ip
    formData.card_brand = this.token.card.brand
    formData.exp_month = this.token.card.exp_month
    formData.exp_year = this.token.card.exp_year
    formData.card_suffix = this.token.card.last4
    formData.id_card = this.token.card.id

    this.stripeService.createPaymentMethod({
      type: 'card',
      card: this.card.element,
      billing_details: {
        name: formData.fname + ' ' + formData.lname,
        address:{ line1: formData.address, city: formData.city, postal_code: formData.zip, country: formData.country },
        email:formData.email
      },
    })
    .subscribe((result) => {
      console.log(result)
      if (result.paymentMethod) {
        this.paymentProcess(result, formData)
      } else if (result.error) {
        // Error send payment
        this.isLoading = false;
        console.log(result.error.message);
      }
    });
  }

  createToken(formData:any, elem:any): void {
    console.log(elem)
    this.stripeService
      .createToken(elem.element, formData)
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          this.token = result.token
          this.paymentCardCreation(formData)
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }


  paymentProcess(result, formData){
    this.donationsService.createStripeCustomer(result).subscribe((customer:any)=>{
      console.log(customer)
      formData['payment_method_id'] = customer.paymentMethod_id
      formData['customer_id'] = customer.customer_id
      formData['product_id'] = customer.product_id
      if (this.multiple){
        this.donationsService.createStripeSubscription({price:formData.sum, currency:formData.currency, product_id:customer.product_id, customer_id:customer.customer_id, month_number:this.selectedMonthNumber}).subscribe((subscription:any)=>{
          console.log(subscription)
          formData['subscription_id'] = subscription.id
          formData['end_subscription'] = this.addMonths(new Date(), this.selectedMonthNumber)
          formData['month_number'] = this.selectedMonthNumber
          formData['is_subscription'] = true
          formData['price_id'] = subscription.plan.id
          this.add_to_donation(formData)
        })
      } else {
        this.donationsService.createStripePayment({price:formData.sum, currency:formData.currency, customer_id:customer.customer_id, paymentMethod_id: customer.paymentMethod_id, payment_method_types:formData.payment_method_types}).subscribe((payment:any)=>{
          console.log(payment)
          formData['client_secret'] = payment.client_secret
          if (formData.payment_method_types == 'card'){
            this.stripeService.confirmCardPayment(payment.client_secret).subscribe((confirm:any)=>{
              console.log(confirm)
              formData['payment_intent_id'] = confirm['paymentIntent']['id']
              this.add_to_donation(formData)
            })
          } else {
            this.stripeService.confirmSepaDebitPayment(payment.client_secret).subscribe((confirm:any)=>{
              console.log(confirm)
              formData['payment_intent_id'] = confirm['paymentIntent']['id']
              formData['payment_method_type'] = confirm['paymentIntent']['payment_method_types']
              this.add_to_donation(formData)
            })
          }
  
        })
      }

    })
  }

  add_to_donation(formData){
    this.donationsService.addDonation(formData).subscribe((donation)=>{
      this.isLoading = false
      this.router.navigate([`/home`]);
    })
  }

  addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

}
