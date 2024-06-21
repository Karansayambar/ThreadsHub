import React, { useContext, useState } from 'react';
import { CategoryContext } from '../../Context/CategoryContext';
import './style.css';

const Search = () => {
    const { search, setSearch, setCategory } = useContext(CategoryContext);
    const [inputValue, setInputValue] = useState('');

    const handleSearchInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Set the search state and clear the input
        setSearch(inputValue.trim());
        // setCategory(''); // Assuming you also want to clear the category when searching
        
        // Optionally, you can clear the input field after submitting
        setInputValue('');
    };

    return (
        <div className='search-container'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={inputValue}
                    onChange={handleSearchInputChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;
