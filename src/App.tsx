import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/searchBar/SearchBar';
import MemeList from './components/memeList/MemeList';
import { Meme } from './types/types';

import SearchSuggestions from './components/suggestionList/Suggestion';
import TrendingGifs from './components/trendList/Trend';
import  { GifCategoriesList } from './components/categoriesList/CategoriesList';
import { GifCategories } from './components/categoriesList/CategoriesGif';



const App: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
 

  const apiKey = 'DoPGRvp1BVmbGNWdzUyfgiE8gWA2TH0S';

  const fetchMemes = () => {

    const limit = 10;
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${limit}&offset=${(page - 1) * limit}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data)
        setMemes(response.data.data);
        setTotalPages(Math.ceil(response.data.pagination.total_count / limit));
        setSelectedMeme(null);
      })
      .catch((error) => console.error('Error fetching memes:', error));
  };


  


  useEffect(() => {
    if (searchTerm) {
      fetchMemes();
    }
  }, [searchTerm, page]);



  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleMemeClick = (meme: Meme) => {
    const selectedMemeUrl = meme.images.fixed_height.url;

    setSelectedMeme(meme);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <SearchBar onSearch={handleSearch} />
      <MemeList memes={memes} onMemeClick={handleMemeClick} />
      {selectedMeme && (
        <div>
          <h2>Selected Meme</h2>
          <img
            src={selectedMeme.images.fixed_height.url}
            alt={selectedMeme.title}
            style={{ width: '300px', height: '300px' }}
          />
          <p>{selectedMeme.title}</p>
          <p>{selectedMeme.source}</p>
          <SearchSuggestions apiKey={apiKey} term={searchTerm}/>
        </div>
      
      )}
      <GifCategoriesList onSelectCategory={setSelectedCategoryId} />
      <GifCategories selectedCategoryId={selectedCategoryId}/>
        <TrendingGifs apiKey={apiKey}/>
    
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous Page
        </button>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;
