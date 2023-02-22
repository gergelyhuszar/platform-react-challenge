import React, { FC, PropsWithChildren } from "react";
import { CssBaseline } from "@mui/material";

const Bootstrapper: FC<PropsWithChildren> = ({ children }) => (
  <>
    <CssBaseline />
    {children}
  </>
);

export default Bootstrapper;
