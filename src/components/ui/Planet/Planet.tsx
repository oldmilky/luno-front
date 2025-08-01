import { FC } from "react";
import s from "./Planet.module.scss";
import Image from "next/image";
import planet from "@/assets/images/planet.svg";

const Planet: FC = () => {
  return (
    <div className={s.planets}>
      <Image
        draggable={false}
        className={s.planet}
        src={planet}
        alt="planet"
        priority={true}
        fetchPriority="high"
      />
    </div>
  );
};

export default Planet;
