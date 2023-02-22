import React, { FC } from "react";
import { Grid } from "@mui/material";
import CatList from "./components";

const RandomCats: FC = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    <CatList />
  </Grid>
);

export default RandomCats;
