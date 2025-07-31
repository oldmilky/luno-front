export interface ButtonPair {
  button: string;
  buttonEn: string;
}

export interface IService {
  _id: string;
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;

  slug: string;

  subtitlePen: string;
  subtitlePenEn: string;
  relized: string;
  relizedEn: string;

  seoTitle: string;
  seoTitleEn: string;
  seoDesc: string;
  seoDescEn: string;

  texts?: ButtonPair[];
  priceText?: ButtonPair[];
  deadlineText?: ButtonPair[];
  defaultText?: ButtonPair[];

  price: number;
  priceEn: number;

  done: string;
  marker: string;
  number: string;

  sort?: number;

  develop: boolean;
  design: boolean;
}
