import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
    return (
        <div className={styles.mainContainer}>
            <form className={styles.searchBarContainer}>
                <input className={styles.searchBar} type='text' required placeholder='Input Here'></input>
                <button className={styles.buttonStyle} type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;

