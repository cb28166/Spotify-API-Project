import React from 'react';
import styles from '../PlaylistSection/Playlist.module.css';

function Playlist({ playlistName, setPlaylistName, tracks}) {
    return (
        <div className={styles.playlistContainer}>
            <form className={styles.playlistForm}>
                <input
                    className={styles.playlistName}
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder='Enter the name of your playlist'
                    required
                />

                <div className={styles.songList}>
                    {tracks?.length === 0 ? (
                        <p>No songs added yet!</p>
                    ) : (
                        tracks.map(track => (
                            <p key={track.id}>
                                {track.name} - {track.artist}
                            </p>
                        ))
                    )}
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