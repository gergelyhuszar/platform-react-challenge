import React, { FC, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { deleteCatFromFavourites, getFavouriteCats } from "apis/catApi";
import { Cat } from "types/cat";
import CatImage from "components/CatImage";
import { useFetch } from "hooks/fetcher";

const FavouriteCatList: FC = () => {
  const [catList, setCatList] = useState<Cat[]>([]);

  useFetch(() => {
    (async () => {
      const cats = await getFavouriteCats();
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
                onClick={() => {
                  if (cat.favouriteId){
                    deleteCatFromFavourites(cat.favouriteId);
                    setCatList((catList) => catList.filter(({ id }) => id !== cat.id ));
                  }
                }}
              />
            </Grid>
          ))
        }
      </Grid>

      { catList.length === 0 && (
        <CircularProgress />
      )}

    </>
  );
};

export default FavouriteCatList;
