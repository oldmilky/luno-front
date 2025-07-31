import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import s from "./Modal.module.scss";
import gsap from "gsap";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.3, ease: [0.8, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.3, ease: [0.7, 0, 0.67, 0] },
  },
};

const Modal = ({ modal, projects }: any) => {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.25,
      ease: "power3",
    });
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.25,
      ease: "power3",
    });
    //Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.25,
      ease: "power3",
    });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.25,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={s.modalContainer}
      >
      </motion.div>
      <motion.div
        ref={cursor}
        className={s.cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>
      <motion.a
        ref={cursorLabel}
        className={s.cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        VIEW
      </motion.a>
    </>
  );
};

export default Modal;
