import React, { FC } from "react";
import {Grid} from "@mui/material";
import CatImage from "./CatImage";

const MOCK_URL = "https://cdn2.thecatapi.com/images/MjA1OTI5MQ.jpg";
const MOCK_RESPONSE = [MOCK_URL, MOCK_URL, MOCK_URL, MOCK_URL, MOCK_URL];

const CatList: FC = () => {
  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
      spacing="50px"
      width="80%"
      marginTop="10px"
    >
      {
        MOCK_RESPONSE.map((url, index) => (
          <Grid item key={index}>
            <CatImage src={MOCK_URL} />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default CatList;
