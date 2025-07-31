interface IImage {
  url: string;
}

interface IGameAttributes {
  slug: string;
  name: string;
  background?: {
    data?: {
      attributes: IImage;
    };
  };
  cheats?: {
    data: Array<any>;
  };
}

export interface ISearchGame {
  attributes: IGameAttributes;
}

export interface ISearchCheat {
  attributes: {
    slug: string;
    name: string;
    image: any;
    game: any;
    status: string;
    prices: any[];
  };
}
