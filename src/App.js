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
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setUserName("");
      setProfileData(null);
      setError(error.message); // Set error message in state
    }
  };

  const handleSubmit = (userName) => {
    startTransition(() => {
      fetchProfileData(userName);
    });
  };

  return (
    <div id="main">
      <SearchBar handleSubmit={handleSubmit} />
      {isPending ? (
        <Typography gutterBottom variant="h4" component="div">
          Please Wait
        </Typography>
      ) : (
        profileData && (
          <Card sx={{ maxWidth: 345 }}>
            <Avatar alt="Avatar" src={profileData.avatar_url} />
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                {profileData.login}
              </Typography>
              <Typography size="small"color={"blue"}>
                <p>@{profileData.login}</p>
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
  );
}
