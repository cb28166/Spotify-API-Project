import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.headerContainer}>
        <div className={styles.textContainer}>
            <h1>Jamming Spotify Playlist Maker</h1>
            <p>Create spotify playlist for your own personal account here!</p>
        </div>
    </div>
  );
}

export default Header;