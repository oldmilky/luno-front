/* eslint-disable react-hooks/exhaustive-deps */
import s from "./Nav.module.scss";
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Links from "./Links/Links";

const Nav: FC = () => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={s.main}>
        <div className={s.header}>
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={s.button}
          >
            <div
              className={`${s.burger} ${isActive ? s.burgerActive : ""}`}
            ></div>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">{isActive && <Links />}</AnimatePresence>
    </motion.div>
  );
};

export default Nav;
