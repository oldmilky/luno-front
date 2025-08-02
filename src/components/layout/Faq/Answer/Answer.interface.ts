export interface AnswerProps {
  title: string;
  titleEn: string;
  number: string;
  text: string;
  textEn: string;
  themeWhite?: boolean;
  isActive: boolean;
  onHover: (isHovered: boolean) => void;
}

