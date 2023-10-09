import React from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import food1 from '../asset/food1.jpg';

function App() {
  const containerStyle = {
    backgroundColor: '#FFA500',
    minHeight: '95vh',
  };

  const contentStyle = {
    padding: '2rem',
    textAlign: 'center',
    color: '#fff',
  };

  const titleStyle = {
    fontSize: '68px',
    marginBottom: '1rem',
  };

  const orderButtonStyle = {
    // backgroundColor: '#FF5733',
    backgroundColor: "white",
    color: 'red',
    padding: '12px 24px',
    fontSize: '18px',
    borderRadius: '30px',
    marginTop: '2rem', // Adjust the margin to add space
    transition: 'background-color 0.3s',
  };

  const imageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '4rem',
  };

  const imageCardStyle = {
    maxWidth: '100%',
    borderRadius: '36px',
    // marginBottom: '2rem', // Adjust the margin to add space
  };

  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <Container>
        <Grid container spacing={3} alignItems="center" style={contentStyle}>
          <Grid item xs={12} md={6} style={imageContainerStyle}>
            <Card style={imageCardStyle}>
              <CardMedia
                component="img"
                alt="Food Image 1"
                height="auto"
                image={food1} // Replace with your image URL
                style={{ maxWidth: '100%', borderRadius: '18px' }}
              />
            </Card>
          </Grid>
           <Grid item xs={12} md={6}>
            <div style={contentStyle}>
              <Typography variant="h1" style={titleStyle}>
                Delicious Food Delivered At Your Door Step
              </Typography>
              <Typography variant="body1">
                Yes, we have the best food in town
              </Typography>
              <Button 
                variant="contained" style={orderButtonStyle}
                sx={{
                  ...orderButtonStyle,
                  '&:hover': {
                    backgroundColor: 'red', // Change the background color on hover
                    color: 'white', // Change the text color on hover
                  },
                }}
                onClick={() => navigate('/login')}
              >
                Order Now
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
