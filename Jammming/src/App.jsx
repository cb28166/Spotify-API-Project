import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import Results from './components/MainBody/Results/Results';
import RightSide from './components/MainBody/PlaylistSection/RightSide';
import {useState} from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([
  {
    id: 1,
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours"
  },
  {
    id: 2,
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia"
  }
  ])

  const [playlistTracks, setPlaylistTracks] = useState([]); // tracks user adds

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.some((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  return (
    <div className="appContainer">
      <div id="header">
        <Header />
      </div>
      <div id="searchBar">
        <SearchBar />
      </div>
      <div className="mainBody">
        <div id="results">
          <Results tracks={searchResults} addTrack={addTrackToPlaylist} />
        </div>
        <div id="playlistSide">
          <RightSide playlistTracks={playlistTracks}/>
        </div>
      </div>
    </div>
  );
}

export default App;
