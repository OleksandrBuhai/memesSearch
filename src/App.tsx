import React, { useEffect, useState } from 'react';
import MemeList from './components/memeList/MemeList';
import SearchBar from './components/searchBar/SearchBar';
import { Meme } from './types/types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemes } from './api/api';
import { GifCategories } from './components/categoriesList/CategoriesGif';
import { GifCategoriesList } from './components/categoriesList/CategoriesList';
import { setPage } from './slices/searchSlice/searchSlice';
import { AppThunkDispatch, RootState } from './slices/store';
import SearchSuggestions from './components/suggestionList/Suggestion';
import TrendingGifs from './components/trendList/Trend';



const App: React.FC = () => {

  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { memes, page, searchTerm, totalPages } = useSelector((state: RootState) => state.searchReducer);

  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(fetchMemes({ searchTerm: '', page }))
  }, [dispatch])

  const handleSearch = (term: string) => {

  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleMemeClick = (meme: Meme) => {
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
          <SearchSuggestions term={searchTerm} onMemeClick={handleMemeClick}/>
        </div>

      )}
      <GifCategoriesList onSelectCategory={setSelectedCategoryId} />
      <GifCategories selectedCategoryId={selectedCategoryId} />
      <TrendingGifs onMemeClick={handleMemeClick} />

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
