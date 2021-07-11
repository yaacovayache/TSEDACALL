export class Campaign {
    constructor(
      public name: string,
      public description: string,
      public founder: string,
      public goal: number,
      public endAt: string,
      public createdAt: string,
      public media?: string
    ) {}
}