import React from 'react';
import { useState } from 'react';
import Playlist from './Playlist';
import Viewport from './Viewport';
import styles from '../PlaylistSection/RightSide.module.css';


function RightSide({ playlistTracks, removeTrack }) {
    const [playlistName, setPlaylistName] = useState("");
    return (
        <div className={styles.rightContainer}>
            <div className={styles.viewport}>
                <Viewport />
            </div>
            <div className={styles.playlist}>
                <Playlist 
                    playlistName={playlistName}
                    setPlaylistName={setPlaylistName}
                    tracks={playlistTracks}
                    removeTrack={removeTrack}
                />
            </div>
        </div>
    );
}

export default RightSide;