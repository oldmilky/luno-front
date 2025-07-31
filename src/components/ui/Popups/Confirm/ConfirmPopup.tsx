import { FC } from "react";
import s from "./ConfirmPopup.module.scss";
import { motion } from "framer-motion";

interface IConfirm {
  active: any;
  setActive: any;
  onclick: any;
}

const ConfirmPopup: FC<IConfirm> = ({ active, setActive, onclick }) => {
  return (
    <motion.div
      className={active ? s.popupOpened : s.popup}
      onClick={() => setActive(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={s.confirmPopup} onClick={(e) => e.stopPropagation()}>
        <p className={s.title}>Подтверждаете ли вы удаление?</p>
        <div className={s.buttons}>
          <button className={s.buttonYes} onClick={onclick}>
            Да
          </button>
          <button className={s.buttonNo} onClick={() => setActive(false)}>
            Нет
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmPopup;
