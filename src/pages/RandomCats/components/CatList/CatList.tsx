import React, { FC, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CatImage from "./CatImage";
import { getCats } from "apis/catApi";
import { Cat } from "types/cat";

const CatList: FC = () => {
  const [catList, setCatList] = useState<Cat[]>();

  useEffect(() => {
    (async () => {
      const cats = await getCats();
      console.log(cats)
      setCatList(cats);
    })();
  }, []);

  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="80%"
      marginBottom="50px"
    >
      {
        catList?.map((cat) => (
          <Grid item key={cat.id} marginTop="50px" marginLeft="50px">
            <CatImage cat={cat} />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default CatList;
