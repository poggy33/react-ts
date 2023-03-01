import * as React from "react";
import { Box, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(14,23,36)",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ color: "white", marginRight: "2px", fontSize: "14px" }}
        >
          Copyright 2023
        </Typography>
        <CopyrightIcon
          sx={{ color: "white", marginTop: "3px", fontSize: "14px" }}
        />
        <Typography
          sx={{ color: "white", marginLeft: "2px", fontSize: "14px" }}
        >
          Ihor Pohaidak
        </Typography>
      </Box>
    </Box>
  );
}
