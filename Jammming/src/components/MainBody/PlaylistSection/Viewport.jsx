import React from 'react';
import { useRef, useLayoutEffect, useState } from 'react';
import styles from '../PlaylistSection/Viewport.module.css';

function Viewport({ hoveredTrack }) {
    const textRef = useRef(null);
    const[shouldScroll, setShouldScroll] = useState(false);

    useLayoutEffect(() => {
        setShouldScroll(false);

        if (textRef.current) {
            const isOverFlowing = textRef.current.scrollWidth > textRef.current.clientWidth;
            setShouldScroll(isOverFlowing);
        }
    }, [hoveredTrack]);



    if (!hoveredTrack) {
        return (
            <div className={styles.viewportContainer}>
                <h3>Hover over a song to See the details!</h3>
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

            <div className={styles.textContainer}>
                {/* Track info */}
                <div className={styles.textWrapper} ref={textRef}>
                    <div className={`${styles.textContent} ${shouldScroll ? styles.scrolling : ""}`}>
                        <p className={styles.trackName}>{hoveredTrack.name}</p>
                        {shouldScroll && <p className={styles.trackName}>{hoveredTrack.name}</p>}
                    </div>
                </div>
                <p className={styles.artistName}>{hoveredTrack.artist}</p>
            </div>
        </div>
    );
}

export default Viewport;