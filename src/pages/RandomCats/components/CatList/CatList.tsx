import React, { FC, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CatImage from "./CatImage";
import { getCats } from "apis/catApi";
import { Cat } from "types/cat";
import CatModal from "./CatModal";

const CatList: FC = () => {
  const [catList, setCatList] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  useEffect(() => {
    (async () => {
      const cats = await getCats();
      setCatList(cats);
    })();
  }, []);

  return (
    <>
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
          catList.map((cat) => (
            <Grid item key={cat.id} marginTop="50px" marginLeft="50px">
              <CatImage cat={cat} onClick={() => setSelectedCat(cat)} />
            </Grid>
          ))
        }
      </Grid>
      {
        selectedCat && (
          <CatModal open={!!selectedCat} onClose={() => setSelectedCat(null)} cat={selectedCat} />
        )
      }
    </>
  );
};

export default CatList;
