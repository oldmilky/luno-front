import { useRouter } from "next/router";
import { FC } from "react";
// import "./ShinyText.scss";

interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const ShinyText: FC<ShinyTextProps> = ({ text, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;
  const { pathname } = useRouter();

  return (
    <div
      className={
        pathname.startsWith("/blog")
          ? `shiny-text-white ${className}`
          : `shiny-text ${className}`
      }
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
