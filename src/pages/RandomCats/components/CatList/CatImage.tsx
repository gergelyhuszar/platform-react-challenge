import React, { FC } from "react";
import {Cat} from "types/cat";

const WIDTH = 300;

interface Props {
  cat: Cat;
}

const CatImage: FC<Props> = ({ cat }) => {
  return (
    <img
      src={cat.url}
      alt="cat"
      width={WIDTH}
      /**
      * Images are painted at different speeds.
      * This would cause Cumulative Layout Shift (CLS) during the Critical Rendering Path's (CRP) Layout step.
      * To avoid CLS, the height is explicitly calculated and passed as an attribute.
      *
      * For more information please visit the following links:
      * Cumulative Layout Shift (CLS): https://web.dev/cls/
      * Critical Rendering Path (CRP): https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#layout
      */
      height={cat.height * (WIDTH/cat.width)}
    />
  );
};

export default CatImage;
