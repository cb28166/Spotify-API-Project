import styles from "./Track.module.css";

function Track({ track }) {
    return (
        <div className={styles.trackContainer}>
            <div className={styles.trackInfo}>
                <span className={styles.name}>{track.name}</span>
                <span> | </span>
                <span>{track.artist}</span>
                <span> | </span>
                <span>{track.album}</span>
            </div>

            {/* Right side: add button */}
            <button className={styles.addButton}>Add</button>
        </div>
    );
}

export default Track;