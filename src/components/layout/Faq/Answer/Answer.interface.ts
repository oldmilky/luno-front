export interface AnswerProps {
  title: string;
  number: string;
  text: string;
  themeWhite?: boolean;
  isActive: boolean;
  onHover: (isHovered: boolean) => void;
}

