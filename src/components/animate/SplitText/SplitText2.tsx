import React, { useRef, useCallback } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
};

class GSAPManager {
  private static instance: GSAPManager;
  private gsap: any = null;
  private scrollTrigger: any = null;
  private loadPromise: Promise<void> | null = null;

  static getInstance(): GSAPManager {
    if (!GSAPManager.instance) {
      GSAPManager.instance = new GSAPManager();
    }
    return GSAPManager.instance;
  }

  async loadGSAP() {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    if (this.gsap && this.scrollTrigger) {
      return Promise.resolve();
    }

    this.loadPromise = (async () => {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      this.gsap = gsapModule.default;
      this.scrollTrigger = scrollTriggerModule.default;
      
      this.gsap.registerPlugin(this.scrollTrigger);
    })();

    return this.loadPromise;
  }

  getGSAP() {
    return this.gsap;
  }

  getScrollTrigger() {
    return this.scrollTrigger;
  }
}

const SplitTextScreen: React.FC<SplitTextProps> = ({ text, className }) => {
  const animationInitialized = useRef(false);
  const gsapManager = GSAPManager.getInstance();

  const initializeAnimation = useCallback(async (element: HTMLDivElement) => {
    if (!element || animationInitialized.current) return;

    try {
      await gsapManager.loadGSAP();
      const gsap = gsapManager.getGSAP();
      const ScrollTrigger = gsapManager.getScrollTrigger();

      if (!gsap || !ScrollTrigger) return;

      const letters = element.querySelectorAll(".letter");

      if (letters.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true,
          },
        });

        letters.forEach((letter: Element, index: number) => {
          tl.to(
            letter,
            {
              rotateX: 360,
              duration: 0.3,
              ease: "power2.inOut",
            },
            index * 0.03
          );
        });

        animationInitialized.current = true;
      }
    } catch (error) {
      console.error("Failed to initialize GSAP animation:", error);
    }
  }, [gsapManager]);

  const textRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      initializeAnimation(element);
    }
  }, [initializeAnimation]);

  return (
    <div
      ref={textRef}
      className={`inline-block ${className || ""}`}
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

export default SplitTextScreen;
