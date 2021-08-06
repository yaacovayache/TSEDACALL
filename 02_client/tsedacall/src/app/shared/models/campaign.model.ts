export class Campaign {
    constructor(
      public _id:string,
      public name: string,
      public description: string,
      public founder: string,
      public goal: number,
      public endAt: string,
      public createdAt: string,
      public media?: string[],
      public totalSum?:number
    ) {}
}