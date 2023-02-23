import React, { FC, useState } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import { deleteCatFromFavourites, getFavouriteCats } from "apis/catApi";
import { Cat } from "types/cat";
import CatImage from "components/CatImage";
import { useFetch } from "hooks/fetcher";
import Sync from "@mui/icons-material/Sync";
import { useNavigate } from "react-router-dom";

const FavouriteCatList: FC = () => {
  const navigate = useNavigate();
  const [catList, setCatList] = useState<Cat[]>([]);

  useFetch(() => {
    (async () => {
      const cats = await getFavouriteCats();
      setCatList(cats);
    })();
  });

  return (
    <>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        startIcon={<Sync />}
        sx={{ marginTop: "50px" }}
      >
        Load random cats
      </Button>

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
                tooltip="Click to delete me"
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
