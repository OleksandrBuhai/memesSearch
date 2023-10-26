import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestion, fetchTrendingGif } from '../../api/api';
import { AppThunkDispatch, RootState } from '../../slices/store';
import { setSelectedMeme, setSimilarMemes } from '../../slices/searchSlice/searchSlice';
import { Meme } from '../../types/types';

interface TrendingGifsType {
  onMemeClick: (meme: Meme) => void;
}

const TrendingGifs: React.FC<TrendingGifsType> = ({onMemeClick}) => {

  const trendingGif = useSelector((state:RootState)=> state.trendingGifReducer.trendingGifs) 

  const dispatch = useDispatch<AppThunkDispatch>()


   useEffect(() => {
   dispatch(fetchTrendingGif())
  }, [dispatch]);

  const handleMemeClick = async (meme: Meme) => {
    dispatch(setSelectedMeme(meme));
    onMemeClick(meme);
    try {
      const similarMemes:any = await dispatch(fetchSuggestion({ term: meme.title }));
      dispatch(setSimilarMemes(similarMemes));
    } catch (error) {
      console.error('Error fetching similar memes:', error);
    }
  };

  return (
    <div>
      <h2>Trending Gifs</h2>
     
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px',gap:'20px'}}>
          {trendingGif.map((gif) => (
            <div key={gif.id}  onClick={() => handleMemeClick(gif)}>
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                style={{ width: '100px', height: '100px' }}
              />
            </div>
          ))}
        </div>
    
    </div>
  );
};

export default TrendingGifs;