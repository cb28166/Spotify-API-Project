import React from 'react';
import styles from './Results.module.css';

function Results() {
    return (
        <div className={styles.resultsContainer}>
            <h3 className={styles.resultsContainer.h3}>Your Songs:</h3>
            <div>
                <h4>This is where the songs will go</h4>
            </div>
        </div>  
    );
}

export default Results;