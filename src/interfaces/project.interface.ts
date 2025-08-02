export interface ButtonPair {
  button: string;
  buttonEn: string;
}

export interface IProject {
  _id: string;
  name: string;
  nameEn: string;
  slug: string;
  subtitle: string;
  subtitleEn: string;

  seoTitle: string;
  seoTitleEn: string;
  seoDesc: string;
  seoDescEn: string;

  date: string;

  // Tags
  typeService: string;
  develop: boolean;
  design: boolean;

  descText?: ButtonPair[];
  techText?: ButtonPair[];
  resultText?: ButtonPair[];

  techs: string;

  image: string;
  image2: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  image10?: string;
  image11?: string;
  image12?: string;
  image13?: string;
  image14?: string;
  image15?: string;

  // sort?: number;
}
