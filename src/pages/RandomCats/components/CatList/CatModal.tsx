import React, { FC } from "react";
import { Cat } from "types/cat";
import { Box, Button, Modal, styled, Typography } from "@mui/material";
import CatImage from "./CatImage";
import StarBorder from "@mui/icons-material/StarBorder";

const MODAL_WIDTH = 600;

const ModalContent = styled(Box)({
  width: `${MODAL_WIDTH}px`,
  maxWidth: "90%",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  border: "1px solid grey",
  padding: "50px",
  borderRadius: "15px",
  outline: "none"
});

const ModalImage = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden"
});

const ScrollableDescription = styled(Typography)({
  overflowY: "auto",
  textAlign: "justify"
});

interface Props {
  open: boolean;
  onClose: () => void;
  cat: Cat;
}

const CatModal: FC<Props> = ({ open, onClose, cat }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <ModalImage>
          <CatImage cat={cat} width={MODAL_WIDTH - 100} />
        </ModalImage>
          {
            cat.breeds.map((breed) => (
              <ScrollableDescription key={breed.id}>
                {breed.description}
              </ScrollableDescription>
            ))
          }
        <Button variant="contained" startIcon={<StarBorder />}>Mark as favourite</Button>
      </ModalContent>
    </Modal>
  );
};

export default CatModal;
