import { motion } from "framer-motion";
import { opacity } from "./Services.anim";
import s from "./Services.module.scss";
import Link from "./Services.link";
import { FC } from "react";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import { design, develop } from "../Home/Services/Service.data";
import { bottomToTop } from "@/assets/animations/animations";
import Symbol from "@/components/animate/Symbol/Symbol";
import useTranslation from "next-translate/useTranslation";
import { useMediaQuery } from "react-responsive";
import { IService } from "@/interfaces/service.interface";

const Services: FC<{ services: IService[] }> = ({ services }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1350px)" });
  const { t, lang } = useTranslation("common");

  console.log(services);

  return (
    <motion.div
      className={s.services}
      variants={opacity}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {isMobile ? (
        <div className={s.titles}>
          <p className={s.title}>{t("header.services")}</p>
          <SplitTextScreen
            text="Here is our small collection of the best projects, see more on github!"
            className={s.subtitle}
          />
        </div>
      ) : (
        <div className={s.titles}>
          <Symbol text={t("header.services")} className={s.title} />
          <SplitTextScreen
            text="Here is our small collection of the best projects, see more on github!"
            className={s.subtitle}
          />
        </div>
      )}
      <div className={s.serviceName}>
        <p className={s.serviceTitle}>#{t("services.subtitle")}</p>
      </div>
      <div className={s.content}>
        {services
          .sort((a: any, b: any) => b.sort - a.sort)
          .filter((item: any) => item.develop)
          .map((el, index) => {
            return (
              <Link
                name={el.name}
                nameEn={el.nameEn}
                subtitle={el.subtitle}
                subtitleEn={el.subtitleEn}
                number={el.number}
                done={el.done}
                index={index}
                key={index}
                texts={el.texts}
                slug={el.slug}
              />
            );
          })}
      </div>
      <div className={s.serviceNameReverse}>
        <p className={s.serviceTitle}>#{t("services.subtitle2")}</p>
      </div>
      <div className={s.content}>
        {services
          .sort((a: any, b: any) => b.sort - a.sort)
          .filter((item: any) => item.design)
          .map((el, index) => {
            return (
              <Link
                name={el.name}
                nameEn={el.nameEn}
                subtitle={el.subtitle}
                subtitleEn={el.subtitleEn}
                number={el.number}
                done={el.done}
                index={index}
                key={index}
                reverse={true}
                texts={el.texts}
                slug={el.slug}
              />
            );
          })}
      </div>
    </motion.div>
  );
};

export default Services;
