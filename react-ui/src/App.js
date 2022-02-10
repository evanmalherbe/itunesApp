import React from "react";

// Import Components
import Favourites from "./Components/Favourites";
import DisplayResults from "./Components/DisplayResults";
import Header from "./Components/Header";
import GetSafe from "./Components/GetSafe";

// Import React Bootstrap elements
import Button from "react-bootstrap/Button";

// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Import images
import media from "./mediaImg.jpg";

// Import custom stylesheet
import "./App.css";

// Class component for app
class App extends React.Component {
  constructor(props) {
    super(props);

    // Define state variables
    this.state = {
      error: null,
      isLoaded: false,
      formSubmitted: false,
      // Raw JSON object from API
      items: {},

      // Array of divs with track/media info ready to be displayed
      resultsArray: [],
      resultsLoaded: false,

      // Default values for search terms and url to fetch from itunes api
      searchTerm: "james blunt",
      mediaType: "all",
      newUrl: null,

      favourite: [],
    };

    // Binding to make "this" work correctly
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeSearchTerm = this.handleChangeSearchTerm.bind(this);
    this.handleChangeMediaType = this.handleChangeMediaType.bind(this);

    this.sortData = this.sortData.bind(this);
    this.fetchAgain = this.fetchAgain.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
    this.deleteFavourite = this.deleteFavourite.bind(this);
  }

  /* Handler function for when user clicks the "Add Favourite" button for a search result. Saves favourite to state, which is then displayed on the right of the page */
  handleFavourite(track, artist, collection, kindOfMedia) {
    let fave = {
      track: track,
      artist: artist,
      collection: collection,
      kindOfMedia: kindOfMedia,
    };

    /* Learn to correctly push objects into state array from here:
    https://www.pluralsight.com/guides/add-data-into-an-array-in-a-state-object */

    this.state.favourite.push(fave);
    this.setState(
      {
        favourite: this.state.favourite,
      },
      console.log("New favourite added. ")
    );
  }

  /* Handler function for when user performs a search and clicks the "Search" button. Saves new search URL to state so it can be used to fetch new results from API */
  handleSubmit(event) {
    // Simplify variable names
    let searchTerm = this.state.searchTerm;
    let mediaType = this.state.mediaType;

    // Learned to replace characters here: https://careerkarma.com/blog/java-string-replace/
    let editedSearchTerm = searchTerm.replace(" ", "+");

    // Create url that includes user search term and media type
    let url = `https://itunes.apple.com/search?term=${editedSearchTerm}&media=${mediaType}&limit=5`;

    // Save new url to state and fetch results by calling "fetchAgain" function
    this.setState(
      {
        newUrl: url,
        resultsLoaded: false,
      },
      () => {
        console.log("New url saved to state: " + this.state.newUrl);
        this.fetchAgain();
      }
    );
  }

  // Handler function to save search term to state when user types it in to form
  handleChangeSearchTerm(event) {
    // Add form data to state variable
    this.setState(
      {
        searchTerm: event.target.value,
      },
      () => console.log("Search term is: " + this.state.searchTerm)
    );
  }

  // Handler function to save media type to state when user selects it from dropdown list
  handleChangeMediaType(event) {
    // Add form data to state variable
    this.setState(
      {
        mediaType: event.target.value,
      },
      () => console.log("Media type is: " + this.state.mediaType)
    );
  }

  // Function to handle when user clicks the cross icon to delete a favourite. Removes it from array in state.
  deleteFavourite(index) {
    let faves = this.state.favourite;
    /* Learn to correctly remove objects from state array here:
    https://www.pluralsight.com/guides/add-data-into-an-array-in-a-state-object */

    faves.splice(index, 1);

    this.setState(
      { favourite: faves },
      console.log("Favourite has been deleted from state.")
    );
  }

  // Function to take data fetched from itunes api and create neat list of results to display
  sortData() {
    // Declare/initialise variables
    let results = [];
    let array = [];
    let initialArray = [];

    // If statement to ensure this function only runs once
    if (this.state.resultsLoaded === false) {
      // Convert JSON object to an array
      initialArray = Object.entries(this.state.items);

      // Create simpler array that leaves out first array elements - "result count:" and "results:"
      array = initialArray[1][1];

      // Display message if we get no results from search
      if (array.length === 0) {
        return <p className="redPara">No results. Try another search.</p>;
      }

      // For loop to create array of div items. One for each result fetched from itunes api
      for (let i = 0; i <= array.length - 1; i++) {
        /* Declare variables. 
        
        Had to do it inside this for loop, since I was getting an error saying, "Function declared in a loop contains unsafe references to variable(s) 'track', 'artist', 'collection', 'kindOfMedia'  no-loop-func"
        
        Fixed it after looking at this site:
        https://stackoverflow.com/questions/60977276/reactjs-function-declared-in-a-loop-contains-unsafe-references-to-variables?noredirect=1&lq=1 */

        let imgSource = "";
        let track = "";
        let artist = "";
        let collection = "";
        let kindOfMedia = "";

        /* These are the if statements to safely deal with undefined results.
          Learned this from here:
          https://wanago.io/2018/03/12/defining-the-undefined-a-try-catch-trick/ */

        if (<GetSafe request={() => array[i].artworkUrl100} /> === undefined) {
          imgSource = media;
        } else {
          imgSource = array[i].artworkUrl100;
        }

        if (<GetSafe request={() => array[i].trackName} /> === undefined) {
          track = "No track name given";
        } else {
          track = array[i].trackName;
        }

        if (<GetSafe request={() => array[i].artistName} /> === undefined) {
          artist = "No artist name given";
        } else {
          artist = array[i].artistName;
        }

        if (<GetSafe request={() => array[i].collectionName} /> === undefined) {
          collection = "No collection name given";
        } else {
          collection = array[i].collectionName;
        }

        if (<GetSafe request={() => array[i].kind} /> === undefined) {
          kindOfMedia = "No collection name given";
        } else {
          kindOfMedia = array[i].kind;
        }

        // ----------------------------------------------------------- //

        // Add values from api to divs/list items in an array. One div for each result returned.
        results.push(
          <div className="resultsListItem" key={i}>
            <img src={imgSource} alt="artist artwork" className="artworkImg" />

            <div className="ulListDiv">
              <ul>
                <li>
                  {" "}
                  <b>Track Name:</b> {track}{" "}
                </li>
                <li>
                  {" "}
                  <b>Artist Name:</b> {artist}{" "}
                </li>
                <li>
                  {" "}
                  <b>Collection Name:</b> {collection}{" "}
                </li>
                <li>
                  {" "}
                  <b>Kind of Media:</b> {kindOfMedia}{" "}
                </li>
              </ul>
            </div>

            {/* Each result includes a button to add it as a favourite */}
            <Button
              variant="primary"
              type="button"
              onClick={() =>
                this.handleFavourite(track, artist, collection, kindOfMedia)
              }
            >
              Add Favourite
            </Button>
          </div>
        );

        // End of for loop to populate array with divs for each result
      }

      /* Save result div items to state variable and set "resultsLoaded" variable to true so this function doesn't run again unless the user performs a new search. */
      this.setState({ resultsArray: results, resultsLoaded: true }, () =>
        console.log("Sortdata function has run. Results Array saved in state.")
      );

      // End of if statement to ensure function only runs once
    }

    // End of sortData function
  }

  /* Function to fetch api data after user submits form. Uses HTTP POST request and sends new url in the request body. componentDidMount() will fetch only the first time when page is rendered. */
  fetchAgain() {
    console.log("Fetch again has run.");

    let newUrl = this.state.newUrl;

    fetch("/changemedia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send new url in body of request
      body: JSON.stringify({
        url: newUrl,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // Save results of request to state and update variables so that results are updated on page
          this.setState(
            {
              resultsLoaded: false,
              isLoaded: true,
              items: result.message,
            },
            () => {
              console.log("Media was fetched and written to state.");

              /* I was getting an error to saying, "Warning: Cannot update during an existing state transition (such as within render or another component's constructor). Render methods should be a pure function of props and state". This was because I was calling "sortData()" from within the render() method. The following website helped me fix that:
             https://stackoverflow.com/questions/54222194/react-error-cannot-update-during-an-existing-state-transition */

              this.sortData();
            }
          );
        },
        (error) => {
          this.setState(
            {
              resultsLoaded: false,
              isLoaded: true,
              error,
            },
            () => console.log("Media fetch failed with the error: " + error)
          );
        }
      );

    // End of function fetchAgain()
  }

  // Function to fetch results from itunes api and save them to state variables. Only runs once on first render
  componentDidMount() {
    /* If statement to check if data has been fetched yet. If it has, it doesn't fetch it again. This prevents infinite loops */
    if (this.state.isLoaded === false) {
      console.log("First fetch has run.");

      // Uses HTTP GET request to fetch default results from api and saves results to state
      fetch("/getmedia")
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                isLoaded: true,
                items: result.message,
              },
              () => {
                console.log("Media was fetched and written to state.");

                /* I was getting an error to saying, "Warning: Cannot update during an existing state transition (such as within render or another component's constructor). Render methods should be a pure function of props and state". This was because I was calling "sortData()" from within the render() method. The following website helped me fix that:
             https://stackoverflow.com/questions/54222194/react-error-cannot-update-during-an-existing-state-transition */

                this.sortData();
              }
            );
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );

      // End of if statement to prevent infinite loop
    }

    // End of componentDidMount function
  }

  // Render page
  render() {
    const { error, isLoaded, searchTerm, mediaType, resultsArray, favourite } =
      this.state;

    // Show error message if there is one
    if (error) {
      return <div> Error: {error.message} </div>;

      // Show "loading" if results are not loaded yet
    } else if (!isLoaded) {
      return <div> Loading... </div>;

      // Else return page
    } else {
      return (
        <div className="app">
          {/* Header for page - includes search form */}
          <Header
            handleSubmit={this.handleSubmit}
            handleChangeSearchTerm={this.handleChangeSearchTerm}
            handleChangeMediaType={this.handleChangeMediaType}
          />

          <div className="mainPage">
            {/* Main part of page - displays results of search and favourites on right */}
            <DisplayResults
              searchTerm={searchTerm}
              mediaType={mediaType}
              resultsArray={resultsArray}
            />

            {/* Display favourites on right side of page */}
            <Favourites
              newFavourite={favourite}
              deleteFavourite={this.deleteFavourite}
            />

            {/* end of mainpage div */}
          </div>

          {/* End of App div */}
        </div>
      );

      // End of if statement
    }
    // End of render() function
  }

  // End of class component "App"
}

// Export component so it can be used by other files
export default App;
