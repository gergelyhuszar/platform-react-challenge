import React, { FC } from "react";
import { Cat } from "types/cat";
import { styled } from "@mui/material";

interface ImageProps {
  withHover: boolean;
}

const Image = styled('img')<ImageProps>(({ withHover }) => ({
  '&:hover': {
    cursor: withHover ? "pointer" : "initial",
    boxShadow: withHover
      ? "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px"
      : "none"
  }
}));

interface Props {
  cat: Cat;
  onClick?: () => void;
  width?: number;
}

const CatImage: FC<Props> = ({ cat, onClick, width = 300 }) => {
  return (
    <Image
      src={cat.url}
      alt="cat"
      onClick={onClick}
      withHover={!!onClick}
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
