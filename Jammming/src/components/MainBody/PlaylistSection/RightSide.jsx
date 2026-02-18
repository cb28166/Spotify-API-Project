import React from 'react';
import { useState } from 'react';
import Playlist from './Playlist';
import Viewport from './Viewport';
import styles from '../PlaylistSection/RightSide.module.css';


function RightSide({ playlistTracks, removeTrack, savePlaylist, playlistName, setPlaylistName, hoveredTrack }) {
    return (
        <div className={styles.rightContainer}>
            <div className={styles.viewport}>
                <Viewport 
                    hoveredTrack={hoveredTrack}
                />
            </div>
            <div className={styles.playlist}>
                <Playlist 
                    playlistName={playlistName}
                    setPlaylistName={setPlaylistName}
                    tracks={playlistTracks}
                    removeTrack={removeTrack}
                    savePlaylist={savePlaylist}
                />
            </div>
        </div>
    );
}

export default RightSide;