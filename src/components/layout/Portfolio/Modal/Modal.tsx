import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import s from "./Modal.module.scss";
import { loadGSAP } from "@/utils/dynamicImports";

// Cyclic color pattern for projects
const PROJECT_COLORS = ["#EBF9FF", "#0D0D0F", "#2A2F38"];

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
    let xMoveContainer: any, yMoveContainer: any, xMoveCursor: any, yMoveCursor: any, xMoveCursorLabel: any, yMoveCursorLabel: any;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (xMoveContainer && yMoveContainer && xMoveCursor && yMoveCursor && xMoveCursorLabel && yMoveCursorLabel) {
        const { pageX, pageY } = e;
        xMoveContainer(pageX);
        yMoveContainer(pageY);
        xMoveCursor(pageX);
        yMoveCursor(pageY);
        xMoveCursorLabel(pageX);
        yMoveCursorLabel(pageY);
      }
    };
    
    // Load GSAP dynamically and set up mouse handlers
    loadGSAP().then((gsap) => {
      //Move Container
      xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
        duration: 0.5,
        ease: "power3",
      });
      yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
        duration: 0.5,
        ease: "power3",
      });
      //Move cursor
      xMoveCursor = gsap.quickTo(cursor.current, "left", {
        duration: 0.25,
        ease: "power3",
      });
      yMoveCursor = gsap.quickTo(cursor.current, "top", {
        duration: 0.25,
        ease: "power3",
      });
      //Move cursor label
      xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
        duration: 0.25,
        ease: "power3",
      });
      yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
        duration: 0.25,
        ease: "power3",
      });

      window.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
        <div style={{ top: index * -100 + "%" }} className={s.modalSlider}>
          {projects.map((project: any, index: any) => {
            // Get cyclic color based on project index
            const color = PROJECT_COLORS[index % PROJECT_COLORS.length];
            return (
              <div
                className={s.modal}
                style={{ backgroundColor: color }}
                key={`modal_${index}`}
              >
                <Image
                  src={project.image}
                  width={420}
                  height={250}
                  alt="image"
                />
              </div>
            );
          })}
        </div>
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
        смотреть
      </motion.a>
    </>
  );
};

export default Modal;