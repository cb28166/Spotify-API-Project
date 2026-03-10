import React from 'react';
import styles from './SearchBar.module.css';
import { useState } from 'react';

function SearchBar({ onSearch, isAuthenticated }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query) return;
        onSearch(query);
    };

    return (
        <div className={styles.mainContainer}>
            <form className={styles.searchBarContainer} onSubmit={handleSubmit}>
                <input 
                    className={styles.searchBar} 
                    type='text' 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required 
                    placeholder='Input Here'
                    disabled={!isAuthenticated}
                    >
                    </input>
                <button className={styles.buttonStyle} type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;

