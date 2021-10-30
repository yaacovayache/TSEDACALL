import { User } from './user.model';

export class Donation {
    constructor(
      public _id:string,
      public sum:number,
      public userId?:string,
      public email?: string,
      public fname?: string,
      public lname?: string,
      public telephone?:string,
      public address?:string,
      public zip?:string,
      public city?:string,
      public country?:string,
      public anonymous?:boolean,
      public isRegistered?:boolean, 
      public message?:string,
      public type_payment?:string,
      public type_donator?:string,
      public campaignId?:string,
      public currency?:string,
      public promise?: boolean,
      public card_brand?: string,
      public id_card?:string,
      public exp_month?:string,
      public exp_year?:string,
      public card_suffix?:string,
      public periodical_payment?:string,
      public periodical_num?:string,
      public paymentMethod_id?:string,
      public customer_id?:string,
      public client_secret?:string,
      public createdAt?:string,

    ) {}
}