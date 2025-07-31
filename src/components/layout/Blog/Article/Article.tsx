import { FC } from "react";
import s from "./Article.module.scss";
import SplitTextScreen from "@/components/animate/SplitText/SplitText2";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import MaskText from "@/components/animate/MaskText/MaskText";
import useTranslation from "next-translate/useTranslation";

interface ArticleProps {
  title: string;
  date: string;
  description: string;
  id: number;
}

const Article: FC<ArticleProps> = ({ title, date, description, id }) => {
  const ParagraphDynamic = dynamic(
    () => import("@/components/animate/TextGradient/TextGradient"),
    {
      ssr: false,
    }
  );

  const { t, lang } = useTranslation("common");

  return (
    <motion.section className={s.article}>
      <div className={s.content}>
        <div className={s.container}>
          <p className={s.date}>{date}</p>
          <ParagraphDynamic paragraph={description} className={s.description} />
        </div>
        <div className={s.container}>
          <MaskText className={s.title} words={[title]} amount={0} />
          <SplitTextScreen text={t("blog.read")} className={s.more} />
        </div>
      </div>
    </motion.section>
  );
};

export default Article;
