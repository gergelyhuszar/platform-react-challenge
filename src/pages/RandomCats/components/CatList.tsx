import React, { FC, useState } from "react";
import { Grid } from "@mui/material";
import CatImage from "components/CatImage";
import { getCats } from "apis/catApi";
import { Cat } from "types/cat";
import CatModal from "components/CatModal";
import { useCatContext } from "context/CatContext";
import { useCatIdParam } from "hooks/params";
import { useFetch } from "hooks/fetcher";

const CatList: FC = () => {
  const [catList, setCatList] = useState<Cat[]>([]);
  const { selectedCat, setSelectedCat } = useCatContext();
  const { setCatIdParam } = useCatIdParam();

  useFetch(() => {
    (async () => {
      const cats = await getCats();
      setCatList(cats);
    })();
  });

  return (
    <>
      <Grid
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
              <CatImage
                cat={cat}
                onClick={async () => {
                  setSelectedCat(cat);
                  setCatIdParam(cat.id);
                }}
              />
            </Grid>
          ))
        }
      </Grid>
      {
        selectedCat && (
          <CatModal
            open={!!selectedCat}
            onClose={() => {
              setSelectedCat(null);
              setCatIdParam();
            }}
            cat={selectedCat}
          />
        )
      }
    </>
  );
};

export default CatList;
