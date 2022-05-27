import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PaginationItem } from "@mui/material";
import { purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

interface Props {
  totalPage: number;
  currentPage: number;
  handleChange: any;
}

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#FA6C16",
    },
  },
});

function Paginate({ totalPage, currentPage, handleChange }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={totalPage}
          color="secondary"
          page={currentPage}
          renderItem={(item) => <PaginationItem {...item} size="large" />}
          // hidePrevButton={currentPage === 1}
          // hideNextButton={currentPage === totalPage}
          onChange={handleChange}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default Paginate;
