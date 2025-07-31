import { CSSProperties, InputHTMLAttributes } from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";

export interface IFieldProps {
  placeholder: string;
  hint: string;
  error?: FieldError | undefined;
  choice?: boolean;
  required?: boolean;
  selected?: boolean;
  handleChoice?: any;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;
export interface IField extends TypeInputPropsField {}

export interface ITextareaProps {
  placeholder: string;
  style?: CSSProperties;
  hint: string;
  error?: FieldError | undefined;
}



export interface IOption {
  label: string;
  value: string;
}
export interface ISelect extends IFieldProps {
  options: IOption[];
  isMulti?: boolean;
  field: ControllerRenderProps<any, any>;
  isLoading?: boolean;
  style: CSSProperties;
  hint: string;
  required?: boolean;
}
