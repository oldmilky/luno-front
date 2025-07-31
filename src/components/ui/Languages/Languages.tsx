import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import s from "./Languages.module.scss";

const Languages = () => {
  const { t, lang } = useTranslation();

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
  };

  return (
    <div className={s.languages}>
      <button
        className={lang === "en" ? s.active : s.button}
        onClick={() => handleLanguageChange("en")}
      >
        EN
      </button>
      <button
        className={lang === "ru" ? s.active : s.button}
        onClick={() => handleLanguageChange("ru")}
      >
        RU
      </button>
    </div>
  );
};

export default Languages;
