export interface ButtonPair {
  text: string;
  textEn: string;
  image?: string;
  video?: string;
}

export interface IBlog {
  _id: string;
  title: string;
  titleEn: string;
  slug: string;
  subtitle: string;
  subtitleEn: string;
  seoTitle: string;
  seoTitleEn: string;
  desc: string;
  descEn: string;
  date: string;
  author: string;
  texts: ButtonPair[];
}
