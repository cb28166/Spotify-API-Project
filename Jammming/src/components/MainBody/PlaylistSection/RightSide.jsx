import React from 'react';
import Playlist from './Playlist';
import Viewport from './Viewport';
import styles from '../PlaylistSection/RightSide.module.css';


function RightSide() {
    return (
        <div className={styles.rightContainer}>
            <div className={styles.viewport}>
                <Viewport />
            </div>
            <div className={styles.playlist}>
                <Playlist />
            </div>
        </div>
    );
}

export default RightSide;