import React from 'react';
import styles from '../PlaylistSection/Playlist.module.css';

function Playlist({ playlistName, setPlaylistName, tracks, removeTrack, savePlaylist }) {
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
                        <h3>No songs added yet!</h3>
                    ) : (
                        tracks.map(track => (
                            <div key={track.id} className={styles.trackRow}>
                                <span className={styles.trackName}>{track.name} - {track.artist}</span>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => removeTrack(track)}
                                >
                                Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.submitWrapper}>
                    <button className={styles.button} type="submit" onClick={savePlaylist}>
                        Send to Spotify
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Playlist;