import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import Results from './components/MainBody/Results/Results';
import RightSide from './components/MainBody/PlaylistSection/RightSide';
import {useState} from 'react';

function App() {
  const [searchResults, setSearchResults] = useState([
  { id: 1, name: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { id: 2, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
  { id: 3, name: "Save Your Tears", artist: "The Weeknd", album: "After Hours" },
  { id: 4, name: "Peaches", artist: "Justin Bieber", album: "Justice" },
  { id: 5, name: "Drivers License", artist: "Olivia Rodrigo", album: "SOUR" },
  { id: 6, name: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR" },
  { id: 7, name: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line" },
  { id: 8, name: "Adore You", artist: "Harry Styles", album: "Fine Line" },
  { id: 9, name: "Montero (Call Me By Your Name)", artist: "Lil Nas X", album: "Montero" },
  { id: 10, name: "Industry Baby", artist: "Lil Nas X", album: "Montero" },
  { id: 11, name: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*CK LOVE 3" },
  { id: 12, name: "Deja Vu", artist: "Olivia Rodrigo", album: "SOUR" },
  { id: 13, name: "Kiss Me More", artist: "Doja Cat ft. SZA", album: "Planet Her" },
  { id: 14, name: "Woman", artist: "Doja Cat", album: "Planet Her" },
  { id: 15, name: "Butter", artist: "BTS", album: "Butter" },
  { id: 16, name: "Permission to Dance", artist: "BTS", album: "Butter" },
  { id: 17, name: "Bad Habits", artist: "Ed Sheeran", album: "=" },
  { id: 18, name: "Shivers", artist: "Ed Sheeran", album: "=" },
  { id: 19, name: "Heat Waves", artist: "Glass Animals", album: "Dreamland" },
  { id: 20, name: "Your Love (9PM)", artist: "ATB, Topic, A7S", album: "Your Love (9PM)" },
  { id: 21, name: "Blame It On Me", artist: "George Ezra", album: "Staying at Tamara’s" },
  { id: 22, name: "Shotgun", artist: "George Ezra", album: "Staying at Tamara’s" },
  { id: 23, name: "Don’t Start Now", artist: "Dua Lipa", album: "Future Nostalgia" },
  { id: 24, name: "Physical", artist: "Dua Lipa", album: "Future Nostalgia" },
  { id: 25, name: "Circles", artist: "Post Malone", album: "Hollywood's Bleeding" },
  { id: 26, name: "Sunflower", artist: "Post Malone & Swae Lee", album: "Spider-Man: Into the Spider-Verse" },
  { id: 27, name: "Rockstar", artist: "DaBaby ft. Roddy Ricch", album: "Blame It On Baby" },
  { id: 28, name: "Levitating (Remix)", artist: "Dua Lipa ft. DaBaby", album: "Future Nostalgia" },
  { id: 29, name: "Mood", artist: "24kGoldn ft. Iann Dior", album: "El Dorado" },
  { id: 30, name: "Therefore I Am", artist: "Billie Eilish", album: "Happier Than Ever" }
])

  const [playlistTracks, setPlaylistTracks] = useState([]); // tracks user adds

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.some((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
  setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
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
          <Results tracks={searchResults} addTrack={addTrackToPlaylist} playlistTracks={playlistTracks} />
        </div>
        <div id="playlistSide">
          <RightSide playlistTracks={playlistTracks} removeTrack={removeTrackFromPlaylist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
