import { FC } from "react";
import s from "./Fields.module.scss";
import { ISelect } from "./Fields.interface";

const SelectField: FC<ISelect> = ({
  placeholder,
  error,
  isMulti,
  options,
  field,
  isLoading,
  style,
  hint,
  required,
}) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = isMulti
      ? Array.from(event.target.selectedOptions, (option) => option.value)
      : event.target.value;
    field.onChange(selectedValue);
  };

  return (
    <div className={s.item} style={style}>
      <div className={s.selectContainer}>
        <p className={s.hint}>
          {hint} {required && <span className={s.required}>*</span>}
        </p>
        <select
          value={field.value}
          onChange={onChange}
          disabled={isLoading}
          className={s.select}
        >
          {!isMulti && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option
              className={s.option}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className={s.error}>{error.message}</span>}
    </div>
  );
};
export default SelectField;
