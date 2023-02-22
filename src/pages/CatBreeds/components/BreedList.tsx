import React, { FC, useState } from "react";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { getCatBreeds } from "apis/catApi";
import { Breed } from "types/cat";
import { useBreedIdParam, useCatIdParam } from "hooks/params";
import BreedModal from "./BreedModal";
import CatImage from "components/CatImage";
import CatModal from "components/CatModal";
import { useCatContext } from "context/CatContext";
import { useFetch } from "hooks/fetcher";
import Sync from "@mui/icons-material/Sync";
import { useNavigate } from "react-router-dom";

const BreedList: FC = () => {
  const navigate = useNavigate();
  const [breedList, setBreedList] = useState<Breed[]>([]);
  const [selectedBreedName, setSelectedBreedName] = useState<string>("");
  const { selectedCat, selectedBreedCats } = useCatContext();
  const { setCatIdParam } = useCatIdParam();
  const { setBreedIdParam } = useBreedIdParam();

  useFetch(() => {
    (async () => {
      const breeds = await getCatBreeds();
      setBreedList(breeds);
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
          breedList.map((breed) => { return breed.image && (
            <Grid item key={breed.id} marginTop="50px" marginLeft="50px">
              <Typography variant="h6">{breed.name}</Typography>
              <CatImage
                cat={breed.image}
                onClick={() => {
                  setBreedIdParam(breed.id);
                  setSelectedBreedName(breed.name || "");
                }}
              />
            </Grid>
          )})
        }
      </Grid>

      { breedList.length === 0 && (
        <CircularProgress />
      )}

      <BreedModal
        open={selectedBreedCats.length !== 0}
        onClose={() => {
          setBreedIdParam();
          setSelectedBreedName("");
        }}
        catList={selectedBreedCats}
        breedName={selectedBreedName}
      />

      {
        selectedCat && (
          <CatModal
            open={!!selectedCat}
            onClose={() => setCatIdParam()}
            cat={selectedCat}
          />
        )
      }
    </>
  );
};

export default BreedList;
