import { fetchMemes } from '@/api/api';
import { baseURL } from '@/router';
import { setSearchTerm } from '@/slices/searchSlice/searchSlice';
import { AppThunkDispatch } from '@/slices/store';
import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchInput, AnimatedButton } from './style/Styles';


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
                onChange={(e:any) => setTerm(e.target.value)}
            />
           <Link style={{width:'10%'}}   to={`${baseURL}/searchable`}> <AnimatedButton 
        
           onClick={handleSearch}>Search</AnimatedButton> </Link>
        </div>
    );
};

export default SearchBar;
