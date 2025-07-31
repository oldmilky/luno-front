import { FC } from "react";
import s from "./Form.module.scss";
import Button from "@/components/animate/Button/Button";
import { bottomToTop } from "@/assets/animations/animations";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { useContactForm } from "@/hooks/useContactForm";

const Form: FC = () => {
  const { t, lang } = useTranslation("common");
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    setBudget,
    setServiceType,
    watchedValues,
  } = useContactForm();

  const budgetOptions = ["< 1.500", "1.500 +", "5000 +"];
  const serviceTypeOptions = [
    t("contacts.input4button"),
    t("contacts.input4button2"),
    t("contacts.input4button3"),
  ];

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <motion.div className={s.container} custom={1} variants={bottomToTop}>
        <p className={s.number}>01</p>
        <div className={s.wrap}>
          <p className={s.title}>{t("contacts.input")} *</p>
          <motion.input
            {...register("name", {
              required: "Имя обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Имя должно содержать минимум 2 символа",
              },
              maxLength: {
                value: 100,
                message: "Имя не должно превышать 100 символов",
              },
            })}
            className={`${s.input} ${errors.name ? s.inputError : ""}`}
            type="text"
            placeholder="Alexandr JJ"
            maxLength={100}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />
          {errors.name && <span className={s.error}>{errors.name.message}</span>}
        </div>
      </motion.div>

      <motion.div className={s.container} custom={1.5} variants={bottomToTop}>
        <p className={s.number}>02</p>
        <div className={s.wrap}>
          <p className={s.title}>
            {t("contacts.input2")} *{" "}
            <span className={s.span}>{t("contacts.input2span")}</span>
          </p>
          <motion.input
            {...register("contact", {
              required: "Контактная информация обязательна",
              pattern: {
                value: /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\+?[1-9]\d{1,14}))$/,
                message: "Введите корректный email или номер телефона",
              },
            })}
            className={`${s.input} ${errors.contact ? s.inputError : ""}`}
            type="text"
            placeholder="email@example.com or +1234567890"
            maxLength={100}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />
          {errors.contact && (
            <span className={s.error}>{errors.contact.message}</span>
          )}
        </div>
      </motion.div>

      <motion.div className={s.container} custom={2} variants={bottomToTop}>
        <p className={s.number}>03</p>
        <div className={s.wrap}>
          <p className={s.title}>{t("contacts.input3")} *</p>
          <div className={s.buttons}>
            {budgetOptions.map((budget) => (
              <motion.button
                key={budget}
                type="button"
                className={`${s.button} ${
                  watchedValues.budget === budget ? s.buttonActive : ""
                }`}
                onClick={() => setBudget(budget)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {budget}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div className={s.container} custom={2.5} variants={bottomToTop}>
        <p className={s.number}>04</p>
        <div className={s.wrap}>
          <p className={s.title}>{t("contacts.input4")} *</p>
          <div className={s.buttons}>
            {serviceTypeOptions.map((service, index) => (
              <motion.button
                key={service}
                type="button"
                className={`${s.button} ${
                  watchedValues.serviceType === service ? s.buttonActive : ""
                }`}
                onClick={() => setServiceType(service)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {service}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div className={s.container} custom={3} variants={bottomToTop}>
        <p className={s.number}>05</p>
        <div className={s.wrap}>
          <p className={s.title}>{t("contacts.input5")}</p>
          <motion.textarea
            {...register("message", {
              maxLength: {
                value: 1000,
                message: "Сообщение не должно превышать 1000 символов",
              },
            })}
            className={`${s.textarea} ${errors.message ? s.inputError : ""}`}
            placeholder={t("contacts.input5text")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />
          {errors.message && (
            <span className={s.error}>{errors.message.message}</span>
          )}
        </div>
      </motion.div>

      <Button 
        buttonClass={s.send} 
        textClass={s.text} 
        circleClass={s.circle}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Отправка..." : t("contacts.button")}
      </Button>
    </form>
  );
};

export default Form;
