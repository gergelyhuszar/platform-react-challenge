import React, { FC, useEffect, useState } from "react";
import { Cat } from "types/cat";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getCatsByBreedId } from "apis/catApi";
import CatImage from "components/CatImage";
import { useCatContext } from "context/CatContext";
import { useCatIdParam } from "hooks/params";

const MODAL_WIDTH = 600;

interface Props {
  open: boolean;
  onClose: () => void;
  breedId: string;
  breedName: string;
}

const BreedModal: FC<Props> = ({ open, onClose, breedId, breedName }) => {
  const [catList, setCatList] = useState<Cat[]>([]);
  const { setSelectedCat } = useCatContext();
  const { setCatIdParam } = useCatIdParam();

  useEffect(() => {
    (async () => {
      const cats = await getCatsByBreedId(breedId);
      setCatList(cats);
    })();
  }, []);

  const dialogTitle = (
    <DialogTitle sx={{ m: 2 }}>
      {breedName}
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );

  const dialogContent = (
    <DialogContent>
      <Grid
        container
        direction="row"
        justifyContent="center"
      >
        {
          catList.map((cat) => (
            <Grid item key={cat.id}>
              <CatImage
                cat={cat}
                onClick={async () => {
                  setSelectedCat(cat);
                  setCatIdParam(cat.id);
                }}
                width={MODAL_WIDTH - 100}
              />
            </Grid>
          ))
        }
      </Grid>
    </DialogContent>
  );

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
      >
        {dialogTitle}
        {dialogContent}
      </Dialog>
    </>
  );
};

export default BreedModal;
