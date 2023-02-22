import React, { FC, Fragment } from "react";
import { Cat } from "types/cat";
import { Box, Button, Modal, styled, Typography } from "@mui/material";
import CatImage from "components/CatImage";
import StarIcon from '@mui/icons-material/Star';
import PetsIcon from '@mui/icons-material/Pets';
import { useAddCatToFavourites } from "apis/catApi";
import { useBreedIdParam, useCatIdParam } from "hooks/params";
import {useNavigate} from "react-router-dom";

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

const Description = styled(Typography)({
  overflowY: "auto",
  textAlign: "justify",
  marginBottom: "20px"
});

interface Props {
  open: boolean;
  onClose: () => void;
  cat: Cat;
}

const CatModal: FC<Props> = ({ open, onClose, cat }) => {
  const navigate = useNavigate();
  const { addCatToFavourites, isLoading } = useAddCatToFavourites();
  const { setCatIdParam } = useCatIdParam();
  const { setBreedIdParam } = useBreedIdParam();

  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 1301 }}>
      <ModalContent>
        <ModalImage>
          <CatImage cat={cat} width={MODAL_WIDTH - 100} />
        </ModalImage>

        { cat.breeds && cat.breeds?.length !== 0 && (
          <Box marginTop="20px" marginBottom="20px">
            {
              cat.breeds?.map((breed) => (
                  <Description key={breed.id}>
                    {breed.description}
                  </Description>
              ))
            }
            <Button
              variant="contained"
              fullWidth
              startIcon={<PetsIcon />}
              onClick={() => {
                setCatIdParam();
                setBreedIdParam();
                navigate(`/cat-breeds`);
              }}
            >
              Go to breeds
            </Button>
          </Box>
        )}

        <Button
          variant="contained"
          startIcon={<StarIcon />}
          onClick={() => addCatToFavourites(cat.id)}
          disabled={isLoading}
        >
          Mark as favourite
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default CatModal;
