import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Props {
  totalPage: number;
  currentPage: number;
  handleChange: any;
}

const theme = createTheme({
  palette: {
    neutral: {
      main: "#FA6C16",
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
function Paginate({ totalPage, currentPage, handleChange }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={totalPage}
          color="neutral"
          size="large"
          page={currentPage}
          // hidePrevButton={currentPage === 1}
          // hideNextButton={currentPage === totalPage}
          onChange={handleChange}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default Paginate;
