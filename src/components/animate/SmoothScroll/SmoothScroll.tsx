"use client";
import { FC, ReactNode, useEffect } from "react";

// We will lazy-load Lenis on client to avoid shipping it to initial JS
let LenisCtor: any = null;

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    let lenisInstance: any = null;

    const initLenis = async () => {
      if (!LenisCtor) {
        const mod = await import("@studio-freight/lenis");
        LenisCtor = mod.default;
      }

      window.scrollTo(0, 0);

      lenisInstance = new LenisCtor();

      function raf(time: number) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
