import s from "./Fields.module.scss";
import { forwardRef } from "react";
import { IField } from "./Fields.interface";

const ChoiceField = forwardRef<HTMLInputElement, IField>(
  (
    {
      size,
      hint,
      placeholder,
      error,
      type,
      choice = "text",
      required,
      style,
      handleChoice,
      selected = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={s.item} style={style}>
        <div className={s.label}>
          <p className={s.hint}>
            {hint} {required && <span className={s.required}>*</span>}
          </p>
          <div className={s.choice}>
            <button
              type="button"
              className={selected ? s.buttonChoiceActive : s.buttonChoice}
              onClick={() => handleChoice(true)}
            >
              Да
            </button>
            <button
              type="button"
              className={!selected ? s.buttonChoiceActive : s.buttonChoice}
              onClick={() => handleChoice(false)}
            >
              Нет
            </button>
          </div>
        </div>
        {error && <p className={s.error}>{error.message}</p>}
      </div>
    );
  }
);

ChoiceField.displayName = "Field";

export default ChoiceField;
