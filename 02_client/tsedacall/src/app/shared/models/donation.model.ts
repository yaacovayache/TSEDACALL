import { User } from './user.model';

export class Donation {
    constructor(
      public _id:string,
      public sum:number,
      public userDetails?: User,
      public campaignId?:string,
      public currency?:string,
      public processId?: string,
      public processToken?: string,
      public allPaymentsNum?: string,
      public asmachta?: string,
      public promise?: boolean,
      public cardBrand?: string,
      public cardBrandCode?:string,
      public cardExp?:string,
      public cardSuffix?:string,
      public cardType?:string,
      public cardTypeCode?:string,
      public description?:string,
      public firstPaymentSum?:string,
      public paymentDate?:string,
      public paymentType?:string,
      public paymentsNum?:string,
      public periodicalPaymentSum?:string,
      public status?:string,
      public transactionId?:string,
      public transactionToken?:string,
      public transactionTypeId?:string,
      public createdAt?:string,

    ) {}
}