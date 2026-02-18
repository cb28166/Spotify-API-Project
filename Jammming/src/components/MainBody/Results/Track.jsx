import styles from "./Track.module.css";

function Track({ track, addTrack, playlistTracks = [], setHoveredTrack }) {

    const isInPlaylist = playlistTracks.some(t => t.id === track.id);

    return (
        <div className={styles.trackContainer} onMouseEnter={() => setHoveredTrack(track)} onMouseLeave={() => setHoveredTrack(null)}> 
            <div className={styles.trackInfo}>
                <span className={styles.name}>{track.name}</span>
                <span> | </span>
                <span>{track.artist}</span>
                <span> | </span>
                <span>{track.album}</span>
            </div>

            {!isInPlaylist && (
                <button className={styles.addButton} onClick={() => addTrack(track)}>Add</button>
            )}
        </div>
    );
}

export default Track;