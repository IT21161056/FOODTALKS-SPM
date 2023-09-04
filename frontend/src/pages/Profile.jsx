import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function Profile() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <Typography>hello</Typography>
      </Box>
    </Container>
  );
}
