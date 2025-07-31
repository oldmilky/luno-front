import s from "./ManageHeader.module.scss";
import { ChangeEvent, FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";

interface IManageHeader {
  onClick?: () => void;
  searchTerm?: string;
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

const ManageHeader: FC<IManageHeader> = ({
  onClick,
  handleSearch,
  searchTerm,
  title,
}) => {
  return (
    <motion.div
      className={s.manageHeader}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={1}
      variants={bottomToTop}
    >
      <h2 className={s.title}>{title}</h2>
      <div className={s.buttons}>
        {handleSearch && (
          <div className={s.search}>
            <input
              className={s.input}
              placeholder="Поиск"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        )}
        {onClick && (
          <button className={s.create} onClick={onClick}>
            Создать
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ManageHeader;
