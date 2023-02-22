import React, { FC, useState } from "react";
import { Grid } from "@mui/material";
import { getCatBreeds } from "apis/catApi";
import { Breed } from "types/cat";
import { useCatIdParam } from "hooks/params";
import BreedModal from "./BreedModal";
import CatImage from "components/CatImage";
import CatModal from "components/CatModal";
import { useCatContext } from "context/CatContext";
import { useFetch } from "hooks/fetcher";

const BreedList: FC = () => {
  const [breedList, setBreedList] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const { selectedCat, setSelectedCat } = useCatContext();
  const { setCatIdParam } = useCatIdParam();

  useFetch(() => {
    (async () => {
      const breeds = await getCatBreeds();
      setBreedList(breeds);
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
          breedList.map((breed) => { return breed.image && (
            <Grid item key={breed.id} marginTop="50px" marginLeft="50px">
              <CatImage
                cat={breed.image}
                onClick={() => setSelectedBreed(breed)}
              />
            </Grid>
          )})
        }
      </Grid>
      {
        selectedBreed?.name && (
          <BreedModal
            open={!!selectedBreed}
            onClose={() => setSelectedBreed(null)}
            breedId={selectedBreed.id}
            breedName={selectedBreed.name}
          />
        )
      }
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

export default BreedList;
