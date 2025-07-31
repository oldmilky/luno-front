import { FC } from "react";
import s from "./Links.module.scss";
import { Link as LinkComponent } from "./Link";
import { StaggeredFade } from "@/components/animate/StaggeredText/StaggeredText";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const Links: FC = () => {
  const { t, lang } = useTranslation("common");

  return (
    <section className={s.links}>
      <div className={s.items}>
        <div className={s.item}>
          <p className={s.paragraph}>{t("contacts.subtitle")}</p>
          {LinkComponent?.texts.map((t, index) => (
            <StaggeredFade links text={t.text} key={index} className={s.text} />
          ))}
        </div>
        <div className={s.item}>
          <p className={s.paragraph}>{t("contacts.subtitle2")}</p>
          {LinkComponent?.texts2.map((t, index) => (
            <Link href={t.link} target="_blank" className={s.wrap} key={index}>
              <StaggeredFade links text={t.text} className={s.textLinks} />
              <div className={t.reverse ? s.wrapperReverse : s.wrapper}
              >
                <Image className={s.logo} src={t.logo} alt="logo" />
              </div>
            </Link>
          ))}
        </div>
        <div className={s.item}>
          <p className={s.paragraph}>{t("contacts.subtitle3")}</p>
          {LinkComponent?.texts3.map((t, index) => (
            <StaggeredFade
              links
              text={lang === "ru" ? t.text : t.textEn}
              key={index}
              className={s.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Links;
