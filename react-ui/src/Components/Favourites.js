import React from "react";

// Import search icon image
import star from "../star.png";

// Import bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import custom stylesheet
import "../App.css";

// Create function to display favourites stored in state array
function Favourites(props) {
  //Declare variables
  let initialArray = [];
  let array = [];

  // Only create divs/lists to display favourites if there actually are favourites in array
  if (props.newFavourite.length !== 0) {
    initialArray = props.newFavourite;

    // For loop to store divs/lists in an array to be displayed
    for (let i = 0; i <= initialArray.length - 1; i++) {
      array.push(
        <div className="faveDiv" key={i}>
          <div className="deleteButtonDiv">
            {/* Delete favourite button (red cross at top right of each favourite) */}
            <button
              type="button"
              variant="primary"
              onClick={() => props.deleteFavourite(i)}
            >
              &nbsp;
            </button>
          </div>
          <ul key={i}>
            <li>Track Name: {initialArray[i].track}</li>
            <li>Artist Name: {initialArray[i].artist}</li>
            <li>Collection: {initialArray[i].collection}</li>
            <li>Media Type: {initialArray[i].kindOfMedia}</li>
          </ul>

          {/* Numbering for each favourite. Number on bottom right corder of favourite box */}
          <div className="faveNum">{i + 1}</div>
        </div>
      );

      // End of for loop to add favourites divs to array
    }

    // If there are no favourites saved yet, display message
  } else {
    array = (
      <p className="bluePara">No favourites yet. Why don't you choose some?</p>
    );
  }

  return (
    <div className="favourites">
      <div className="faveTitle">
        <h2>Favourites</h2>
        <img className="starImg" src={star} alt="star" />
      </div>

      {/* Display favourites stored in array */}
      {array}
    </div>
  );
}

// Export component so it can be used by App.js
export default Favourites;
