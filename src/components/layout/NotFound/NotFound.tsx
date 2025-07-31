import { FC } from "react";
import s from "./NotFound.module.scss";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import Link from "next/link";
import Button from "@/components/animate/Button/Button";

const NotFound: FC = () => {
  return (
    <motion.section
      className={s.notFound}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={2}
      variants={bottomToTop}
    >
      <p className={s.title}>Sorry, page not found</p>
      <p className={s.number}>404</p>
      <p className={s.subtitle}>
        This page either does not exist or an error occurred
      </p>
      <Link href="/">
        <Button
          buttonClass={s.button}
          textClass={s.text}
          circleClass={s.circle}
        >
          GO HOME
        </Button>
      </Link>
    </motion.section>
  );
};

export default NotFound;
