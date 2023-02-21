import React, { FC } from "react";
import { Cat } from "types/cat";
import {Grid, Modal, styled} from "@mui/material";
import CatImage from "./CatImage";

const MODAL_WIDTH = 600;

const ModalContent = styled(Grid)({
  width: `${MODAL_WIDTH}px`,
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

interface Props {
  open: boolean;
  onClose: () => void;
  cat: Cat;
}

const CatModal: FC<Props> = ({ open, onClose, cat }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <ModalContent>
        <CatImage cat={cat} width={MODAL_WIDTH > 1000 ? 900 : MODAL_WIDTH - 100} />
        {
          cat.breeds.map((breed, index) => (
            <span key={index}>{breed.description}</span>
          ))
        }
      </ModalContent>
    </Modal>
  );
};

export default CatModal;
