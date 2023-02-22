import React, { FC } from "react";
import { Grid } from "@mui/material";
import BreedList from "./components/BreedList";

const CatBreeds: FC = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    <BreedList />
  </Grid>
);

export default CatBreeds;
