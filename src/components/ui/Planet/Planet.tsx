import { FC } from "react";
import s from "./Planet.module.scss";
import planet from "@/assets/images/planet.svg";
import Image from "next/image";

const Planet: FC = () => {
  return (
    <div className={s.planets}>
      <Image src={planet} className={s.planet} alt="planet" priority={true} />
    </div>
  );
};

export default Planet;
