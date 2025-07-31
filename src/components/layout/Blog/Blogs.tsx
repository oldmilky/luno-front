import { FC, useState } from "react";
import s from "./Blogs.module.scss";
import Planet from "@/components/ui/Planet/Planet";
import { TypeAnimation } from "react-type-animation";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import Button from "@/components/animate/Button/Button";
import { motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";
import { useMediaQuery } from "react-responsive";
import Symbol from "@/components/animate/Symbol/Symbol";
import Header from "@/components/ui/Header/Header";
import { articles } from "./Articles.data";
import Article from "./Article/Article";
import CountUp from "@/components/animate/CountUp/CountUp";
import useTranslation from "next-translate/useTranslation";

const Blogs: FC = () => {
  const { t, lang } = useTranslation("common");

  return (
    <motion.section
      className={s.blogs}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      custom={1}
      variants={bottomToTop}
    >
      <Header />
      <div className={s.content}>
        <div className={s.titles}>
          <Symbol text={t("header.blog")} className={s.title} />
          <p className={s.articles}>
            (
            <CountUp
              from={0}
              to={120}
              separator=","
              direction="up"
              duration={2}
            />{" "}
            {t("blog.articles")})
          </p>
        </div>
        {articles.map((article, index) => (
          <motion.div
            key={index}
            custom={1.2 + index * 0.2}
            variants={index % 2 === 0 ? bottomToTop : bottomToTop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Article key={article.id} {...article} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Blogs;
