export class Campaign {
    constructor(
      public _id:string,
      public name: string,
      public description: string,
      public founder_id: string,
      public goal: number,
      public endAt: string,
      public createdAt: string,
      public media?: string[],
      public video?: string,
      public cover?: string,
      public totalSum?:number
    ) {}
}