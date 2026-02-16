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
  },
  {
    id: 3,
    name: "Peaches",
    artist: "Justin Bieber",
    album: "Justice"
  },
  {
    id: 4,
    name: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours"
  },
  {
    id: 5,
    name: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line"
  },
  {
    id: 6,
    name: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3"
  },
  {
    id: 7,
    name: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR"
  },
  {
    id: 8,
    name: "Industry Baby",
    artist: "Lil Nas X",
    album: "Montero"
  },
  {
    id: 9,
    name: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland"
  },
  {
    id: 10,
    name: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House"
  },
  {
    id: 11,
    name: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights"
  },
  {
    id: 12,
    name: "Bad Habits",
    artist: "Ed Sheeran",
    album: "="
  },
  {
    id: 13,
    name: "Shivers",
    artist: "Ed Sheeran",
    album: "="
  },
  {
    id: 14,
    name: "Easy On Me",
    artist: "Adele",
    album: "30"
  },
  {
    id: 15,
    name: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation"
  },
  {
    id: 16,
    name: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover"
  },
  {
    id: 17,
    name: "Happier Than Ever",
    artist: "Billie Eilish",
    album: "Happier Than Ever"
  },
  {
    id: 18,
    name: "Circles",
    artist: "Post Malone",
    album: "Hollywood's Bleeding"
  },
  {
    id: 19,
    name: "Rockstar",
    artist: "DaBaby ft. Roddy Ricch",
    album: "Blame It on Baby"
  },
  {
    id: 20,
    name: "Sunflower",
    artist: "Post Malone & Swae Lee",
    album: "Hollywood's Bleeding"
  },
  {
    id: 21,
    name: "Memories",
    artist: "Maroon 5",
    album: "Jordi"
  },
  {
    id: 22,
    name: "Believer",
    artist: "Imagine Dragons",
    album: "Evolve"
  },
  {
    id: 23,
    name: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷"
  }
  ])

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
          <Results tracks={searchResults} />
        </div>
        <div id="playlistSide">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default App;
