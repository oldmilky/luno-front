"use client";
import { FC, ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
