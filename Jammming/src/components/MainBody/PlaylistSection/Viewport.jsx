import React from 'react';
import styles from '../PlaylistSection/Viewport.module.css';

function Viewport({ hoveredTrack }) {

    if (!hoveredTrack) {
        return (
            <div>
                <h1>Hover over a song to See the details!</h1>
            </div>
        );
    }

    //Displays if there is a song being hovered over
    return (
        <div className={styles.viewportContainer}>
            {/* Album cover */}
            <img 
                src={hoveredTrack.albumCover || 'placeholder-image-url'} 
                alt={`${hoveredTrack.name} album cover`} 
                className={styles.albumCover} 
            />

            {/* Track info */}
            <h3 className={styles.trackName}>{hoveredTrack.name}</h3>
            <p className={styles.artistName}>{hoveredTrack.artist}</p>
        </div>
    );
}

export default Viewport;