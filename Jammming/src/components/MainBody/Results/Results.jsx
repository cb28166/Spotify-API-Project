import React from 'react';
import styles from './Results.module.css';
import Track from './Track';


function Results({ tracks = [], addTrack }) {
    return (
        <div className={styles.resultsContainer}>
            <h3 className={styles.header}>Your Songs:</h3>

            <div className={styles.trackList}>
                {tracks.map(track => (
                    <Track key={track.id} track={track} addTrack={addTrack}/>
                ))}
            </div>
        </div>  
    );
}

export default Results;