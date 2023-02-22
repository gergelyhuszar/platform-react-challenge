import React, { FC } from "react";
import { Cat } from "types/cat";

interface Props {
  cat: Cat;
  onClick?: () => void;
  width?: number;
}

const CatImage: FC<Props> = ({ cat, onClick, width = 300 }) => {
  return (
    <img
      src={cat.url}
      alt="cat"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "initial" }}
      width={width}
      /**
      * Images are painted at different speeds.
      * This would cause Cumulative Layout Shift (CLS) during the Critical Rendering Path's (CRP) Layout step.
      * One way to avoid CLS is to explicitly calculate height and pass it as an attribute.
      *
      * For more information please visit the following links:
      * Cumulative Layout Shift (CLS): https://web.dev/cls/
      * Critical Rendering Path (CRP): https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#layout
      */
      height={cat.height * (width/cat.width)}
    />
  );
};

export default CatImage;
