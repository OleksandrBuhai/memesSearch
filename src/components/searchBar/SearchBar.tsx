import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMemes } from '../../api/api';
import { setSearchTerm } from '../../slices/searchSlice/searchSlice';
import { AppThunkDispatch } from '../../slices/store';
import { AnimatedButton, SearchInput } from './style/Styles';

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setTerm] = useState('');

    
    const dispatch = useDispatch<AppThunkDispatch>();

    const handleSearch = () => {
        onSearch(searchTerm);
        dispatch(setSearchTerm(searchTerm))
        dispatch(fetchMemes({searchTerm, }))
    };

    return (
        <div style={{paddingTop:'1rem', display:'flex'}} >
            <SearchInput
                type="text"
                placeholder="Search for memes"
                value={searchTerm}
                onChange={(e) => setTerm(e.target.value)}
            />
           <Link style={{width:'10%'}}   to="/seacrhable"> <AnimatedButton 
        
           onClick={handleSearch}>Search</AnimatedButton> </Link>
        </div>
    );
};

export default SearchBar;
