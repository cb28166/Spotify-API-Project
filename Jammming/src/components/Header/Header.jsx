import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.headerContainer}>
        <div className={styles.textContainer}>
            <h1 className={styles.h1}>Jamming Spotify Playlist Maker</h1>
            <p className={styles.p}>Search for songs and create your own playlist that you can save on your own Spotify account!</p>
        </div>
    </div>
  );
}

export default Header;