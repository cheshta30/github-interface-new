import React, { useState } from 'react';
import styled from 'styled-components';

// Styled input with dynamic text and background colors
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  color: ${(props) => props.theme.color};  // Use theme color for text
  background-color: ${(props) => (props.theme.background === '#060730' ? '#333' : '#fff')};  // Change background based on theme
`;

function SearchBar({ handleSubmit, theme }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(inputValue);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input 
        type="text" 
        placeholder="Search GitHub username…" 
        value={inputValue} 
        onChange={handleInputChange}
        theme={theme}  // Pass the theme prop to styled input
      />
    </form>
  );
}

export default SearchBar;
