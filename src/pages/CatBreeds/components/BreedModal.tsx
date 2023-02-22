import React, { FC } from "react";
import { Cat } from "types/cat";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CatImage from "components/CatImage";
import { useCatIdParam } from "hooks/params";

const MODAL_WIDTH = 600;

interface Props {
  open: boolean;
  onClose: () => void;
  catList: Cat[];
  breedName: string;
}

const BreedModal: FC<Props> = ({ open, onClose, catList, breedName }) => {
  const { setCatIdParam } = useCatIdParam();

  const dialogTitle = (
    <DialogTitle margin="10px">
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
        marginBottom="20px"
      >
        {
          catList.map((cat) => (
            <Grid item key={cat.id}>
              <CatImage
                cat={cat}
                onClick={() => setCatIdParam(cat.id)}
                width={MODAL_WIDTH - 100}
              />
            </Grid>
          ))
        }
      </Grid>
    </DialogContent>
  );

  return (
    <Dialog
      onClose={onClose}
      open={open}
    >
      {dialogTitle}
      {dialogContent}
    </Dialog>
  );
};

export default BreedModal;
