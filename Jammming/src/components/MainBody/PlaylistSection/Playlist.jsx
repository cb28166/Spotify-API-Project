import React from 'react';
import styles from '../PlaylistSection/Playlist.module.css';

function Playlist() {
    return (
        <div className={styles.playlistContainer}>
            <form className={styles.playlistForm}>
                <input
                    className={styles.playlistName}
                    type="text"
                    placeholder='Enter the name of your playlist'
                    required
                />

                <div className={styles.songList}>
                    <p>Place Holder Cause this is where the added songs will go</p>
                    {/* This is where tracks will be added dynamically */}
                </div>

                <div className={styles.submitWrapper}>
                    <button className={styles.button} type="submit">
                        Send to Spotify
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Playlist;