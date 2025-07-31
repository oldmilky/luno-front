import { FC } from "react";
import s from "./Service.module.scss";
import Name from "./Name/Name";
import Order from "@/components/ui/Order/Order";
import { motion } from "framer-motion";
import Desc from "./Desc/Desc";
import { IService } from "@/interfaces/service.interface";

const Service: FC<{ service: IService; services: IService[] }> = ({
  service,
  services,
}) => {
  if (!service) {
    return <div className={s.notfound}>Service not found :c</div>;
  }

  return (
    <motion.section
      className={s.service}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={s.content}>
        <Name
          name={service.name}
          nameEn={service.nameEn}
          subtitle={service.subtitle}
          subtitleEn={service.subtitleEn}
          relized={service.relized}
          relizedEn={service.relizedEn}
          priceText={service.priceText}
          deadlineText={service.deadlineText}
          defaultText={service.defaultText}
        />
      </div>
      <Desc texts={service.texts} />
      <Order />
    </motion.section>
  );
};

export default Service;
