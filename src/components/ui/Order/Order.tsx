import { FC } from "react";
import s from "./Order.module.scss";
import Symbol from "@/components/animate/Symbol/Symbol";
import Button from "@/components/animate/Button/Button";
import { motion } from "framer-motion";
import { rightToLeft } from "@/assets/animations/animations";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const Order: FC = () => {
  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.order}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={s.content}>
        <div className={s.titles}>
          <Symbol text={t("order.title")} className={s.title} />
          <Symbol text={t("order.title2")} className={s.title} />
        </div>
        <div className={s.container}>
          <motion.p className={s.text} custom={1.3} variants={rightToLeft}>
            {t("order.text")}
          </motion.p>
          <motion.p className={s.text} custom={1.6} variants={rightToLeft}>
            {t("order.text2")}
          </motion.p>
          <motion.p className={s.text} custom={1.9} variants={rightToLeft}>
            {t("order.text3")}
          </motion.p>
          <motion.div custom={2.2} variants={rightToLeft}>
            <Link href="/contacts">
              <Button buttonClass={s.view} circleClass={s.circle}>
                {t("order.order")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Order;
