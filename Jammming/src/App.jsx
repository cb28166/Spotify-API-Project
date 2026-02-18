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
    album: "After Hours",
    uri: "spotify:track:1",
    albumCover: "https://i.scdn.co/image/ab67616d0000b273c1b1fa2b5deaf55d1d1f444d"
  },
  {
    id: 2,
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    uri: "spotify:track:2",
    albumCover: "https://i.scdn.co/image/ab67616d0000b2738c3f7887f5c7e0b0a3f5f5bb"
  },
  {
    id: 3,
    name: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    uri: "spotify:track:3",
    albumCover: "https://i.scdn.co/image/ab67616d0000b273c1b1fa2b5deaf55d1d1f444d"
  },
  {
    id: 4,
    name: "Peaches",
    artist: "Justin Bieber",
    album: "Justice",
    uri: "spotify:track:4",
    albumCover: "https://i.scdn.co/image/ab67616d0000b273f0f6fefcbfa2b1b47b58fa38"
  },
  {
    id: 5,
    name: "Drivers License",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    uri: "spotify:track:5",
    albumCover: "https://i.scdn.co/image/ab67616d0000b273a08f1b902e6d6f5b658fc689"
  },
  {
    id: 6,
    name: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    uri: "spotify:track:6",
    albumCover: "https://i.scdn.co/image/ab67616d0000b273a08f1b902e6d6f5b658fc689"
  },
  {
    id: 7,
    name: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    uri: "spotify:track:7",
    albumCover: "https://i.scdn.co/image/ab67616d0000b2737c1d839e7b72e6f93ab3d5ab"
  },
  {
    id: 8,
    name: "Adore You",
    artist: "Harry Styles",
    album: "Fine Line",
    uri: "spotify:track:8",
    albumCover: "https://i.scdn.co/image/ab67616d0000b2737c1d839e7b72e6f93ab3d5ab"
  },
  {
    id: 9,
    name: "Montero (Call Me By Your Name)",
    artist: "Lil Nas X",
    album: "Montero",
    uri: "spotify:track:9",
    albumCover: "https://i.scdn.co/image/ab67616d0000b273d024a0f914f173c28d4f123a"
  },
  {
    id: 10,
    name: "Industry Baby",
    artist: "Lil Nas X",
    album: "Montero",
    uri: "spotify:track:10",
    albumCover: "https://i.scdn.co/image/ab67616d0000b273d024a0f914f173c28d4f123a"
  }
])

  const [playlistTracks, setPlaylistTracks] = useState([]); // tracks user adds
  const [playlistName, setPlaylistName] = useState(""); //tracks name of playlist users make 
  const [hoveredTrack, setHoveredTrack] = useState(null); //tracks what song users are hovering over

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
  }

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
