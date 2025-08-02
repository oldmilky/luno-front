import Seo from "@/providers/Seo";
import Header from "../ui/Header/Header";
import Faq from "../layout/Faq/Faq";
import Footer from "../ui/Footer/Footer";
import { FC } from "react";
import Contacts from "../layout/Contacts/Contacts";
import useTranslation from "next-translate/useTranslation";

const ContactsPages: FC = () => {
  const { lang } = useTranslation("common");

  const title =
    lang === "ru"
      ? "Контакты LUNOWEB — Связь с нами, Telegram, форма, почта"
      : "Contact LUNOWEB — Form, Email, Telegram, WhatsApp";

  const description =
    lang === "ru"
      ? "Свяжитесь с веб-студией LUNOWEB: Telegram, WhatsApp, форма обратной связи, электронная почта. Оперативная поддержка и ответы на любые вопросы."
      : "Get in touch with LUNOWEB: Telegram, WhatsApp, contact form, email. Fast response and full support.";

  return (
    <Seo title={title} description={description} lang={lang as "ru" | "en"}>
      <Header />
      <Contacts />
      <Faq />
      <Footer />
    </Seo>
  );
};

export default ContactsPages;
