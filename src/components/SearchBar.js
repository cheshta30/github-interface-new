import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import '../App.css'


function SearchBar(){
  const [searchQuery,setSearchQuery]= useState('');


    return(
    <form> 

      <TextField
        // id="search-bar"
        // className="text"
        label="Search Github Username"
        // variant="outlined"
        placeholder="Search..."
        size="small"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        
      />
      <button id="SubmitButton" onClick={setSearchQuery}>Search</button>
      {/* <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton> */}
    </form>)
} 
    
export default SearchBar;