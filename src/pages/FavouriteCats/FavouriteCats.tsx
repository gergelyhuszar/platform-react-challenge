import React, { FC } from "react";
import { Grid } from "@mui/material";
import FavouriteCatList from "./components/FavouriteCatList";

const FavouriteCats: FC = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    <FavouriteCatList />
  </Grid>
);

export default FavouriteCats;
