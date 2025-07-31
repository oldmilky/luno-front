import { FC, useState } from "react";

const HoverText: FC<{ text: string }> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            color: isHovered ? "#6B717E" : "#ebf9ffe6",
            transition: `color 0.3s ${index * 0.03}s`,
            display: "inline-block",
            whiteSpace: "pre"
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default HoverText;
