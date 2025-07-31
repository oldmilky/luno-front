import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useMemo, memo } from "react";
import styles from "./TextGradient.module.scss";

interface ParagraphProps {
  paragraph: string;
  className?: string;
}

interface WordProps {
  children: string;
  progress: any;
  range: number[];
  index: number;
}

const Word = memo<WordProps>(({ children, progress, range, index }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span
      className={styles.word}
      style={{
        willChange: "opacity",
        transform: "translateZ(0)",
      }}
    >
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
});

Word.displayName = "Word";

export default function Paragraph({ paragraph, className }: ParagraphProps) {
  const container = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 1.15", "start 0.35"],
  });

  const words = useMemo(() => {
    if (!paragraph) return [];
    return paragraph.split(" ");
  }, [paragraph]);

  const wordRanges = useMemo(() => {
    return words.map((_, i) => {
      const start = i / words.length;
      const end = start + 1 / words.length;
      return [start, end];
    });
  }, [words]);

  const renderedWords = useMemo(() => {
    return words.map((word, i) => (
      <Word
        key={`${word}-${i}`}
        progress={scrollYProgress}
        range={wordRanges[i]}
        index={i}
      >
        {word}
      </Word>
    ));
  }, [words, wordRanges, scrollYProgress]);

  if (!paragraph) return null;

  return (
    <p
      ref={container}
      className={`${styles.paragraph} ${className || ""}`}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      {renderedWords}
    </p>
  );
}

export { Word };
