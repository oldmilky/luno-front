import { forwardRef } from "react";
import { IField } from "./Field.interface";
import s from "../Fields.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const Field = forwardRef<HTMLInputElement, IField>(
  (
    { placeholder, error, required, type = "text", hint, style, styleInput, ...rest },
    ref
  ) => {
    return (
      <div className={s.field} style={style}>
        <p className={s.hint}>{hint}{required ? "*" : ""}</p>
        <input
          className={s.input}
          style={styleInput}
          placeholder={placeholder}
          type={type}
          ref={ref}
          {...rest}
          autoComplete="off"
        />
        <AnimatePresence initial={false} onExitComplete={() => null}>
          {error && (
            <motion.p
              className={s.error}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Field.displayName = "Field";
export default Field;
