import * as React from 'react';
import { useState } from "react";
import './App.css';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchBar from './components/SearchBar'


function App() {
  const [searchQuery, setSearchQuery] = useState("");


function fetchProfile(username) {
    return fetch(`https://api.github.com/users/${setSearchQuery}`);
}



  return(
    <div id="main">
    <div
      // style={{
      //   display: "flex",
      //   alignSelf: "center",
      //   justifyContent: "center",
      //   flexDirection: "column",
      //   padding: 20
      // }}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
    <Card sx={{ maxWidth: 345 }}>
      <Avatar alt="Avatar" src="C:\Users\hp_laptop\React JS\simple_calculator\public\favicon.ico" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  );


}

export default App;
