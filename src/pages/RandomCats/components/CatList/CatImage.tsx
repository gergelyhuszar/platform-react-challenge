import React, { FC } from "react";

interface Props {
  src: string;
}

const CatImage: FC<Props> = ({ src }) => {
  return (
    <img
      src={src}
      alt="cat"
      height="300px"
      width="300px"
    />
  );
};

export default CatImage;
