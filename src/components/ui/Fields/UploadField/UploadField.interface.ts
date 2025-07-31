import { CSSProperties } from "react";
import { FieldError } from "react-hook-form";

export interface IUploadField {
  folder?: string;
  value?: string;
  onChange: (...event: any[]) => void;
  placeholder: string;
  error?: FieldError;
  style?: CSSProperties;
  isNoImage?: boolean;
  hint: string,
  required?: boolean;
}
