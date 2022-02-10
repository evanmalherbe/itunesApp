import React from "react";

// Import image
import logo from "../musicLogo.png";

// Import component
import SearchForm from "./SearchForm";

// Import custom stylesheet
import "../App.css";

// Function to display header for page. Includes search form component
function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>iTunes</h1>

      {/* Display Search Form component */}
      <SearchForm
        handleSubmit={props.handleSubmit}
        handleChangeSearchTerm={props.handleChangeSearchTerm}
        handleChangeMediaType={props.handleChangeMediaType}
      />
    </header>
  );
}

// Export component for use in other files
export default Header;
