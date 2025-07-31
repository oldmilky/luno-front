import { CSSProperties, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface IFieldProps {
  placeholder: string;
  error?: FieldError | undefined;
  styleInput?: CSSProperties;
  hint?: string;
  required?: boolean;
}
type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;
export interface IField extends TypeInputPropsField {}
