import { FC, useRef, useMemo } from "react";
import s from "./Media.module.scss";
import Image from "next/image";
import Symbol from "@/components/animate/Symbol/Symbol";
import mock from "@/assets/images/mockImage2.png";
import planet from "@/assets/images/planetCases.svg";
import { useDraggable } from "react-use-draggable-scroll";
import { useScroll, useTransform, motion } from "framer-motion";
import { bottomToTop } from "@/assets/animations/animations";

interface MediaProps {
  image: string;
  image2: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  image10?: string;
  image11?: string;
  image12?: string;
  image13?: string;
  image14?: string;
  image15?: string;
}

const Media: FC<MediaProps> = ({
  image,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
}) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const { scrollXProgress } = useScroll({ container: ref });
  const x = useTransform(scrollXProgress, [0, 1], ["0%", "-85%"]);

  // Memoize images array to avoid recreation on each render
  const images = useMemo(() => {
    const allImages = [
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      image10,
      image11,
      image12,
      image13,
      image14,
      image15,
    ];

    return allImages
      .map((img, index) => ({
        src: img || (index < 2 ? mock : undefined),
        index,
      }))
      .filter(
        (item): item is { src: string | typeof mock; index: number } =>
          item.src !== undefined && item.src !== null && item.src !== ""
      );
  }, [
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
  ]);

  return (
    <motion.section
      className={s.media}
      initial="hidden"
      whileInView="visible"
      variants={bottomToTop}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={s.content} {...events} ref={ref}>
        {images.map((imageItem, i) => (
          <motion.div
            key={`media-image-${imageItem.index}-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "0px 100px 0px 0px" }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: "3" }}
          >
            <Image
              draggable={false}
              className={s.image}
              src={imageItem.src}
              alt={`media image ${imageItem.index + 1}`}
              width={650}
              height={350}
              // loading="eager"
              // loading="lazy"
              // priority={false}
            />
          </motion.div>
        ))}
      </div>
      <Image className={s.planet} src={planet} alt="planet" />
    </motion.section>
  );
};

export default Media;
