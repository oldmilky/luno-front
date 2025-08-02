// Import dynamic at the top
import dynamic from "next/dynamic";

// Optimized dynamic imports utility

// GSAP with caching
let gsapCache: any = null;
export const loadGSAP = async () => {
  if (gsapCache) return gsapCache;
  
  // Defer heavy import until browser is idle to avoid blocking LCP
  const importGsap = () => import("gsap").then((mod) => mod.default);

  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    gsapCache = await new Promise((resolve) => {
      (window as any).requestIdleCallback(async () => {
        const gsap = await importGsap();
        resolve(gsap);
      });
    });
  } else {
    // Fallback – small timeout to push after critical rendering
    gsapCache = await new Promise((resolve) => {
      setTimeout(async () => {
        const gsap = await importGsap();
        resolve(gsap);
      }, 1200);
    });
  }
  return gsapCache;
};

// GSAP ScrollTrigger with caching
let scrollTriggerCache: any = null;
export const loadScrollTrigger = async () => {
  if (scrollTriggerCache) return scrollTriggerCache;
  
  const [gsap, ScrollTrigger] = await Promise.all([
    loadGSAP(),
    import("gsap/ScrollTrigger")
  ]);
  
  scrollTriggerCache = ScrollTrigger.default;
  gsap.registerPlugin(scrollTriggerCache);
  return scrollTriggerCache;
};

// Heavy animation components
export const DynamicModal = dynamic(() => import("@/components/layout/Portfolio/Modal/Modal"), {
  ssr: false
});

// Media component with draggable scroll
export const DynamicMedia = dynamic(() => import("@/components/layout/Case/Media/Media"), {
  ssr: false
}); 