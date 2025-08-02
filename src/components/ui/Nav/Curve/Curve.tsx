import React, { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import s from "./Curve.module.scss";

const Curve: FC = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Установить начальные размеры
    updateDimensions();

    // Обработчик изменения размера с дебаунсингом
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener("resize", debouncedResize);
    
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Возвращаем null до получения размеров для избежания flash
  if (dimensions.height === 0) {
    return null;
  }

  const initialPath = `M100 0 L200 0 L200 ${dimensions.height} L100 ${
    dimensions.height
  } Q-100 ${dimensions.height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${dimensions.height} L100 ${
    dimensions.height
  } Q100 ${dimensions.height / 2} 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className={s.curve}>
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      ></motion.path>
    </svg>
  );
};

export default Curve;
