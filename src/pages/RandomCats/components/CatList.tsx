import React, { FC, useState } from "react";
import { Button, Grid } from "@mui/material";
import CatImage from "components/CatImage";
import { getCats } from "apis/catApi";
import { Cat } from "types/cat";
import CatModal from "components/CatModal";
import { useCatContext } from "context/CatContext";
import { useCatIdParam } from "hooks/params";
import { useFetch } from "hooks/fetcher";
import PetsIcon from "@mui/icons-material/Pets";

const CatList: FC = () => {
  const [catList, setCatList] = useState<Cat[]>([]);
  const { selectedCat } = useCatContext();
  const { setCatIdParam } = useCatIdParam();

  const { refetch } = useFetch(() => {
    (async () => {
      const cats = await getCats();
      setCatList((catList) => [...catList, ...cats]);
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
                onClick={() => setCatIdParam(cat.id)}
              />
            </Grid>
          ))
        }
      </Grid>

      <Button
        variant="contained"
        onClick={() => refetch()}
        sx={{ marginBottom: "50px" }}
      >
        Load more cats
      </Button>

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

export default CatList;
