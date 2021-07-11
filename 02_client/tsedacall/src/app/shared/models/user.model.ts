export class User {
    constructor(
      public email: string,
      public fname: string,
      public lname: string,
      public _id?: string,
      public accessToken?: string,
      public role?: number,
      public img?: string,
      public password?:string,
      public telephone?: string,
      public street?: string,
      public number?: string,
      public city?: string,
      public associationName?: string,
      public chat?:Chat[],
      public isRegistered?:boolean
    ) {}
}

export interface AuthResponseData {
  user: User;
  token: string;
}

export interface Chat {
  createdAt:string;
  support?: string;
  client?:string
}