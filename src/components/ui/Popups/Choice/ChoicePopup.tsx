import s from "./ChoicePopup.module.scss";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import questionIcon from "@/assets/images/question.svg";
import Image from "next/image";
import sbp from "@/assets/images/sbp.svg";
import sber from "@/assets/images/sber.svg";
import view from "@/assets/images/view.svg";
import arrowLeft from "@/assets/images/arrowLeftLight.svg";
import { fadeInVariants } from "@/assets/animations/animations";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface IChoice {
  active: any;
  setActive: any;
  href?: any;
  slug: string;
  selectedPlane: any;
  onSubmit: (type: string, bankType: string, callback: any) => void;
}

const ChoicePopup: FC<IChoice> = ({ active, setActive, href, onSubmit }) => {
  const [isActiveChoice, setIsActiveChoice] = useState<boolean>(false);
  const [isPalychData, setIsPalychData] = useState<any>();

  const handleBackClick = () => {
    setIsPalychData(null);
    setIsActiveChoice(false);
  };

  const { user } = useAuth();

  return (
    <motion.div
      className={active ? s.popupOpened : s.popup}
      onClick={() => setActive(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={s.choicePopup} onClick={(e) => e.stopPropagation()}>
        {isPalychData ? (
          <div className={s.refsContainer}>
            <button className={s.refsNav} onClick={handleBackClick}>
              <Image src={arrowLeft} alt="arrowLeft" />
              Вернуться обратно
            </button>
            <p className={s.title}>
              Ваш ордер успешно создан! Оплатите с помощью:
            </p>
            <p className={s.title}></p>
            <div className={s.refsWrapper}>
              {isPalychData?.type === "card" ? (
                <p className={s.refsText}>
                  Номер карты:{" "}
                  <span className={s.refsSpan}>{isPalychData?.cardNumber}</span>
                </p>
              ) : (
                <p className={s.refsText}>
                  Номер телефона:{" "}
                  <span className={s.refsSpan}>
                    {isPalychData?.phoneNumber}
                  </span>
                </p>
              )}

              <p className={s.refsText}>
                Сумма перевода:{" "}
                <span className={s.refsSpan}>{isPalychData?.amountRub} ₽</span>
              </p>
              <p className={s.refsText}>
                Название банка:{" "}
                <span className={s.refsSpan}>{isPalychData?.bank}</span>
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className={s.title}>Оплатить с помощью:</p>
            <div className={s.content}>
              <div className={s.paymentBeeWrapper}>
                {user ? (
                  <div
                    className={isActiveChoice ? s.wrapActive : s.wrap}
                    onClick={() => setIsActiveChoice(!isActiveChoice)}
                  >
                    BeePay
                    <span className={s.spanWrap}>
                      (Необходима регистриция на сайте)
                    </span>
                  </div>
                ) : (
                  <Link
                    className={isActiveChoice ? s.wrapActive : s.wrap}
                    href="/auth/login"
                  >
                    BeePay
                    <span className={s.spanWrap}>
                      (Необходима авторизация на сайте)
                    </span>
                  </Link>
                )}
              </div>
              {/* <div className={s.wrap} onClick={() => onSubmit("none", "VTB")}>
                Втб
              </div> */}
              {/* <div
                className={s.wrap}
                onClick={() => onSubmit("none", "PayPalych", setIsPalychData)}
              >
                PayPalych
              </div> */}
              <a className={s.wrap} href={href} target="_blank">
                Digiseller
              </a>
            </div>
            <AnimatePresence>
              {isActiveChoice && (
                <motion.div
                  className={s.choiceWrapper}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInVariants}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => onSubmit("sbp", "BeePay", setIsPalychData)}
                    className={s.buttonChoice}
                  >
                    <Image className={s.payIcon} src={sbp} alt="sbp" />
                    SPB
                    <Image src={view} alt="view" />
                  </button>
                  <button
                    onClick={() => onSubmit("card", "BeePay", setIsPalychData)}
                    className={s.buttonChoice}
                  >
                    <Image className={s.payIcon} src={sber} alt="sber" />
                    Sber
                    <Image src={view} alt="view" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={s.container}>
              <p className={s.text}>
                Напиши админу промокод «LoveDomino» и получи +1 день к подписке,
                на чит Domination
              </p>
              <p className={s.question}>
                <Image className={s.icon} src={questionIcon} alt="question" />
                Инструкция к покупке
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ChoicePopup;
