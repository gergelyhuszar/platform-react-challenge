import React, { FC, useState } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import CatImage from "components/CatImage";
import { getCats } from "apis/catApi";
import { Cat } from "types/cat";
import CatModal from "components/CatModal";
import { useCatContext } from "context/CatContext";
import { useCatIdParam } from "hooks/params";
import { useFetch } from "hooks/fetcher";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Sync from "@mui/icons-material/Sync";

const CatList: FC = () => {
  const navigate = useNavigate();
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
      <Button
        variant="contained"
        onClick={() => navigate("/favourite-cats")}
        startIcon={<StarIcon />}
        sx={{ marginTop: "50px" }}
      >
        Go to favourite cats
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
                onClick={() => setCatIdParam(cat.id)}
              />
            </Grid>
          ))
        }
      </Grid>

      { catList.length === 0 && (
        <CircularProgress />
      )}

      <Button
        variant="contained"
        onClick={() => refetch()}
        startIcon={<Sync />}
        sx={{ margin: "50px" }}
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
