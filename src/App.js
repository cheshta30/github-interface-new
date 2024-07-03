import React, { useState, useTransition } from "react";
import "./App.css";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SearchBar from "./components/SearchBar";
import { FaTwitter } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { GoLink } from "react-icons/go";
import { PiBuildingOfficeLight } from "react-icons/pi";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

function fetchGithubData(userName) {
  return fetch(`https://api.github.com/users/${userName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    });
}

export default function App() {
  const [userName, setUserName] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const fetchProfileData = async (userName) => {
    try {
      const data = await fetchGithubData(userName);
      setUserName(data.login);
      setProfileData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setUserName("");
      setProfileData(null);
      setError(error.message);
    }
  };

  const handleSubmit = (userName) => {
    startTransition(() => {
      fetchProfileData(userName);
    });
  };

  return (
    <div id="Overall">
      <nav>
        <h4>devfinder</h4>
        Theme
        <br/>
        <SearchBar handleSubmit={handleSubmit} />
      </nav>
      <CssBaseline />
      <Box sx={{ bgcolor: '#040526', height: '100vh' }}>
        <div id="output">
          {isPending ? (
            <Typography gutterBottom variant="h4">
              Please Wait
            </Typography>
          ) : (
            profileData && (
              <Card sx={{ bgcolor: '#222352', maxWidth: 1000 }}>
                <br/>
                <Avatar  sx={{ width: 90, height: 90 }} alt="Avatar" sizes="" src={profileData.avatar_url} />
                
                <div><div className="inline-container">
                        <Typography gutterBottom variant="h3">
                          {profileData.login}
                        </Typography>
                        <Typography variant="body2">
                          Joined: {new Date(profileData.created_at).toLocaleDateString()}
                        </Typography><br/>
                        
                </div>
                <Typography size="small" color={"blue"}>
                    <p>@{profileData.login}</p>
                  </Typography>

                </div>
                <CardContent>
                  
                  <Typography variant="body2">
                    {profileData.bio ? profileData.bio : <p>This profile has no bio</p>}
                    <br />
                    Followers: {profileData.followers}
                    <br />
                    Following: {profileData.following}
                    <br />
                    Repos: {profileData.public_repos}
                    <br />
                    Joined: {new Date(profileData.created_at).toLocaleDateString()}
                  </Typography>
                  {profileData.location ? (
                    <div>
                      <IoLocationSharp /> {profileData.location}
                    </div>
                  ) : (
                    <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                      <IoLocationSharp /> Not Available
                    </Typography>
                  )}
                  {profileData.twitter_username ? (
                    <div>
                      <FaTwitter /> {profileData.twitter_username}
                    </div>
                  ) : (
                    <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                      <FaTwitter /> Not Available
                    </Typography>
                  )}
                  {profileData.blog ? (
                    <div>
                      <GoLink /> {profileData.blog}
                    </div>
                  ) : (
                    <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                      <GoLink /> Not Available
                    </Typography>
                  )}
                  {profileData.company ? (
                    <div>
                      <PiBuildingOfficeLight /> {profileData.company}
                    </div>
                  ) : (
                    <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                      <PiBuildingOfficeLight /> Not Available
                    </Typography>
                  )}
                </CardContent>
              </Card>
            )
          )}
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </div>
      </Box>
    </div>
  );
}
