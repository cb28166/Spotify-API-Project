import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import Results from './components/MainBody/Results/Results';
import RightSide from './components/MainBody/PlaylistSection/RightSide';

function App() {
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
          <Results />
        </div>
        <div id="playlistSide">
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default App;
