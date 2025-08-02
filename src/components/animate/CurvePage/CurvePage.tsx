import React, { FC, ReactNode, useEffect, useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { text, curve, translate } from "./CurgePage";
import useTranslation from "next-translate/useTranslation";
import { useQuery } from "react-query";
import { ProjectService } from "@/services/project.service";
import { ServiceService } from "@/services/service.service";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";

type Routes = {
  [key: string]: string;
};

interface AnimProps {
  variants: Variants;
  initial: "initial";
  animate: "enter";
  exit: "exit";
}

const anim = (variants: Variants): AnimProps => {
  return {
    variants,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
};

interface CurveProps {
  children: ReactNode;
  background?: string;
}

interface Dimensions {
  width: number | null;
  height: number | null;
}

interface SVGProps {
  height: number;
  width: number;
  onAnimationComplete?: () => void;
}

const Curve: FC<CurveProps> = ({ children, background }) => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  // Получаем проекты с оптимизированным кешированием
  const { data: projects } = useQuery(
    ["projects-routes"],
    () => ProjectService.getAll(),
    {
      select: ({ data }) => data,
      staleTime: 5 * 60 * 1000, // 5 минут
      cacheTime: 10 * 60 * 1000, // 10 минут
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  // Получаем услуги с оптимизированным кешированием
  const { data: services } = useQuery(
    ["services-routes"],
    () => ServiceService.getAll(),
    {
      select: ({ data }) => data,
      staleTime: 5 * 60 * 1000, // 5 минут
      cacheTime: 10 * 60 * 1000, // 10 минут
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const routes: Routes = useMemo(() => {
    const baseRoutes: Routes = {
      "/": "LUNOWEB",
      "/cases": `${t("header.portfolio")}`,
      "/services": `${t("header.services")}`,
      "/contacts": `${t("footer.title")}`,
      "/service": "ИНТЕРНЕТ МАГАЗИН",
      "/case": "GHOST CHEATS",
      "/notFound": "404",
      "/blogs": `${t("header.blog")}`,
      "/manage/services": "Управление услугами",
      "/manage/projects": "Управление проектами",
    };

    if (projects?.length) {
      projects.forEach((project) => {
        const projectName = lang === "en" ? project.nameEn : project.name;
        baseRoutes[`/case/${project.slug}`] = projectName;
      });
    }

    if (services?.length) {
      services.forEach((service) => {
        const serviceName = lang === "en" ? service.nameEn : service.name;
        baseRoutes[`/service/${service.slug}`] = serviceName;
      });
    }

    return baseRoutes;
  }, [t, lang, projects, services]);

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: null,
    height: null,
  });
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Устанавливаем начальные размеры
    handleResize();

    // Дебаунсинг для resize события
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [router.pathname]);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  return (
    <>
      <div className="page">{isAnimationComplete && children}</div>
      <div className="curve">
        <div
          style={{ opacity: dimensions.width == null ? 1 : 0 }}
          className="background"
        />
        <motion.p className="route" {...anim(text)}>
          <Image width={60} height={40} src={logo} alt="logo" />
          {routes[router.asPath] || routes[router.route]}
        </motion.p>
        {dimensions.width && dimensions.height && (
          <SVG
            height={dimensions.height}
            width={dimensions.width}
            onAnimationComplete={() => setIsAnimationComplete(true)}
          />
        )}
      </div>
    </>
  );
};

const SVG: FC<SVGProps> = ({ height, width, onAnimationComplete }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg {...anim(translate)} onAnimationComplete={onAnimationComplete}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};

export default Curve;
