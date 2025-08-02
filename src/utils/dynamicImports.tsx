// Import dynamic at the top
import dynamic from "next/dynamic";

// Optimized dynamic imports utility

// GSAP with caching
let gsapCache: any = null;
export const loadGSAP = async () => {
  if (gsapCache) return gsapCache;

  const gsap = (await import("gsap")).default;
  gsapCache = gsap;
  return gsap;
};

// GSAP ScrollTrigger with caching
let scrollTriggerCache: any = null;
export const loadScrollTrigger = async () => {
  if (scrollTriggerCache) return scrollTriggerCache;

  const [gsap, ScrollTrigger] = await Promise.all([
    loadGSAP(),
    import("gsap/ScrollTrigger"),
  ]);

  scrollTriggerCache = ScrollTrigger.default;
  gsap.registerPlugin(scrollTriggerCache);
  return scrollTriggerCache;
};

// Heavy animation components
export const DynamicModal = dynamic(
  () => import("@/components/layout/Portfolio/Modal/Modal"),
  {
    ssr: false,
  }
);

// Media component with draggable scroll
export const DynamicMedia = dynamic(
  () => import("@/components/layout/Case/Media/Media"),
  {
    ssr: false,
  }
);
