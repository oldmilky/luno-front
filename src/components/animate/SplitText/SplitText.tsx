import React, { useRef, useEffect } from "react";
import gsap from "gsap";

type SplitTextProps = {
  text: string;
  className?: string;
};

const SplitText: React.FC<SplitTextProps> = ({ text, className }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = textRef.current?.querySelectorAll(".letter");

    if (letters) {
      const tl = gsap.timeline({ paused: true });

      letters.forEach((letter, index) => {
        tl.to(
          letter,
          {
            rotateX: 360,
            duration: 0.5,
            ease: "power2.inOut",
          },
          index * 0.07
        );
      });

      textRef.current?.addEventListener("mouseenter", () => tl.restart());
    }

    return () => {
      textRef.current?.removeEventListener("mouseenter", () => {});
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={`inline-block cursor-pointer ${className}`}
      style={{ display: "inline-block", perspective: 1000 }}
    >
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className="letter inline-block"
          style={{
            display: "inline-block",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  );
};

export default SplitText;
