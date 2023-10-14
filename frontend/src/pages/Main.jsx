import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import food1 from "../asset/food1.jpg";
import styled from "styled-components";

function App() {
  const StyledContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  `;

  const contentStyle = {
    padding: "2rem",
    textAlign: "center",
  };

  const StyledTitle = styled("h1")`
    font-size: 68px;
    margin-bottom: 1rem;
  `;

  const titleStyle = {};

  const orderButtonStyle = {
    // backgroundColor: '#FF5733',
    backgroundColor: "white",
    color: "red",
    padding: "12px 24px",
    fontSize: "18px",
    borderRadius: "30px",
    marginTop: "2rem", // Adjust the margin to add space
    transition: "background-color 0.3s",
  };

  const imageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "4rem",
  };

  const imageCardStyle = {
    maxWidth: "100%",
    borderRadius: "36px",
    // marginBottom: '2rem', // Adjust the margin to add space
  };

  const navigate = useNavigate();

  return (
    <StyledContainer>
      <Grid container spacing={3} alignItems="center" style={contentStyle}>
        <Grid item xs={12} md={6} style={imageContainerStyle}>
          <Card style={imageCardStyle}>
            <CardMedia
              component="img"
              alt="Food Image 1"
              height="auto"
              image={food1} // Replace with your image URL
              style={{ maxWidth: "100%", borderRadius: "18px" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={contentStyle}>
            <StyledTitle variant="h1" style={titleStyle}>
              Delicious Food Delivered At Your Door Step
            </StyledTitle>
            <Typography variant="body1">
              Yes, we have the best food in town
            </Typography>
            <Button
              variant="contained"
              style={orderButtonStyle}
              sx={{
                ...orderButtonStyle,
                "&:hover": {
                  backgroundColor: "red", // Change the background color on hover
                  color: "white", // Change the text color on hover
                },
              }}
              onClick={() => navigate("/login")}
            >
              Order Now
            </Button>
          </div>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default App;
