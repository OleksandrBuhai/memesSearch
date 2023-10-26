import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMemes } from '../../api/api';
import { setSearchTerm } from '../../slices/searchSlice/searchSlice';
import { AppThunkDispatch } from '../../slices/store';

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setTerm] = useState('');

    
    const dispatch = useDispatch<AppThunkDispatch>();

    const handleSearch = () => {
        onSearch(searchTerm);
        dispatch(setSearchTerm(searchTerm))
        dispatch(fetchMemes({searchTerm, page:1}))
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for memes"
                value={searchTerm}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
