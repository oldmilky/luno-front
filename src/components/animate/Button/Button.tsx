import React, { FC } from "react";
import { useEffect, useRef } from "react";
import s from "./Button.module.scss";
import { loadGSAP } from "@/utils/dynamicImports";
import Magnetic from "./Magnetic";

interface ButtonProps {
  children: React.ReactNode;
  [key: string]: any;
}

const Button: FC<ButtonProps> = ({
  buttonClass,
  textClass,
  circleClass,
  children,
  ...attributes
}) => {
  const circle = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<any>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    loadGSAP().then((gsap) => {
      timeline.current = gsap.timeline({ paused: true });
      timeline.current
        .to(
          circle.current,
          { top: "-25%", width: "150%", duration: 0.3, ease: "power3.in" },
          "enter"
        )
        .to(
          circle.current,
          { top: "-150%", width: "125%", duration: 0.2 },
          "exit"
        );
    });
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (timeline.current) {
      timeline.current.tweenFromTo("enter", "exit");
    }
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      if (timeline.current) {
        timeline.current.play();
      }
    }, 300);
  };

  return (
    <Magnetic>
      <button
        className={`${s.button} ${buttonClass}`}
        style={{ overflow: "hidden" }}
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        {...attributes}
      >
        <p className={`${s.text} ${textClass}`}>{children}</p>
        <div ref={circle} className={`${s.circle} ${circleClass}`} />
      </button>
    </Magnetic>
  );
};

export default Button;
