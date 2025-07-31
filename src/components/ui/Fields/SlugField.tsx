import { CSSProperties, FC } from "react";
import s from "./Fields.module.scss";
import { FieldError, UseFormRegister } from "react-hook-form";
import Field from "./Field/Field";

interface ISlugField {
  error?: FieldError;
  register: UseFormRegister<any>;
  generate: () => void;
  style?: CSSProperties;
}

const SlugField: FC<ISlugField> = ({ generate, register, error, style }) => {
  return (
    <div className={s.slugField} style={style}>
      <Field
        {...register("slug", {
          required: "Slug is required",
        })}
        hint="Название слаг / ссылку"
        placeholder="Введи слаг..."
        error={error}
        style={{ width: "410px" }}
        styleInput={{ height: "70px" }}
        required
      />
      <div className={s.slugButton} onClick={generate}>
        Сгенерировать
      </div>
    </div>
  );
};

SlugField.displayName = "SlugField";
export default SlugField;
