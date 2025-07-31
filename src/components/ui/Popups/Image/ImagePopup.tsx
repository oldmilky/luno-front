import Image from "next/image";
import s from "./ImagePopup.module.scss";
import { FC } from "react";
import { motion } from "framer-motion";
import arrowLeft from "@/assets/images/arrowLeftLight.svg";
import arrowRight from "@/assets/images/arrowLight.svg";

interface IImage {
  active: any;
  setActive: any;
  image: string;
  onNext: () => void;
  onPrev: () => void;
  canNext: boolean;
  canPrev: boolean;
}

const ImagePopup: FC<IImage> = ({
  active,
  setActive,
  image,
  onNext,
  onPrev,
  canNext,
  canPrev,
}) => {
  return (
    <motion.div
      className={active ? s.popupOpened : s.popup}
      onClick={() => setActive(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={s.imagePopup} onClick={(e) => e.stopPropagation()}>
        {canPrev && (
          <button className={s.arrow} onClick={onPrev}>
            <Image src={arrowLeft} width={20} height={20} alt="arrow left" />
          </button>
        )}
        <div className={s.images}>
          <Image
            className={s.image}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
            }}
            width={1200}
            height={650}
            src={image}
            alt="image"
          />
        </div>
        {canNext && (
          <button className={s.arrow} onClick={onNext}>
            <Image src={arrowRight} width={20} height={20} alt="arrow left" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ImagePopup;
