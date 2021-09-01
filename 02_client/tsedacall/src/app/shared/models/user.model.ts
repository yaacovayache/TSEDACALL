export class User {
    constructor(
      public email: string,
      public fname: string,
      public lname: string,
      public _id?: string,
      public accessToken?: string,
      public role?: number,
      public img?: string,
      public associationName?: string,
      public address?: string,
      public zip?: string,
      public city?: string,
      public country?: string,
      public password?:string,
      public telephone?: string,
      public chat?:Chat[],
      public isRegistered?:boolean,
      public anonymous?:boolean,
      public isRegisteredStr?:string,
      public message?:string
    ) {}
}

export interface AuthResponseData {
  user: User;
  token: string;
}

export interface Chat {
  createdAt:string;
  sender?:string;
  message?:string;
  support?: string;
  client?:string
}