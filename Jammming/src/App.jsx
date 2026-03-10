import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import Results from './components/MainBody/Results/Results';
import RightSide from './components/MainBody/PlaylistSection/RightSide';
import {useEffect, useState} from 'react';
import Spotify from './utils/Spotify';

function App() {

  useEffect(() => {
  async function initializeSpotify() {
    try {
      // Step 1: Make sure user is authenticated
      await Spotify.getAccessToken();

      // Step 2: Test the API request
      const profile = await Spotify.apiRequest("me");

      console.log("Spotify profile:", profile);
      setIsAuthenticated(true); //authentication proccess is finished
    } catch (error) {
      console.error("Spotify setup failed:", error);
    }
  }

  initializeSpotify();
}, []);



  const [searchResults, setSearchResults] = useState([]);

  const [playlistTracks, setPlaylistTracks] = useState([]); // tracks user adds
  const [playlistName, setPlaylistName] = useState(""); //tracks name of playlist users make 
  const [hoveredTrack, setHoveredTrack] = useState(null); //tracks what song users are hovering over
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.some((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
  setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.uri);
    alert("Saved your playlist: " + playlistName);
    console.log("Saved URIS:" + trackUris);
    setPlaylistTracks([]);
    setPlaylistName("");
  };

  const handleSearch = async (query) => {
    if (!isAuthenticated) {
      console.alert("Spotify not ready yet");
      return;
    }

    try {
      const results = await Spotify.searchTracks(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="appContainer">
      <div id="header">
        <Header />
      </div>
      <div id="searchBar">
        <SearchBar onSearch={handleSearch} isAuthenticated={isAuthenticated} />
      </div>
      <div className="mainBody">
        <div id="results">
          <Results tracks={searchResults} addTrack={addTrackToPlaylist} playlistTracks={playlistTracks} setHoveredTrack={setHoveredTrack} />
        </div>
        <div id="playlistSide">
          <RightSide playlistTracks={playlistTracks} removeTrack={removeTrackFromPlaylist} savePlaylist={savePlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} hoveredTrack={hoveredTrack}/>
        </div>
      </div>
    </div>
  );
}

export default App;
