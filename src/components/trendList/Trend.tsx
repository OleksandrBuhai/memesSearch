import { fetchTrendingGif, fetchSuggestion } from '@/api/api';
import { baseURL } from '@/router';
import { setSelectedMeme, setSimilarMemes } from '@/slices/searchSlice/searchSlice';
import { RootState, AppThunkDispatch } from '@/slices/store';
import { StyledHeader } from '@/styles/HeaderTextStyle';
import { Img } from '@/styles/Img';
import { MemeWrapper } from '@/styles/MemeWrapper';
import { Meme } from '@/types/types';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface TrendingGifsType {
 
}

export const TrendingGifs: React.FC<TrendingGifsType> = ({}) => {

  const trendingGif = useSelector((state:RootState)=> state.trendingGifReducer.trendingGifs) 
  const loading = useSelector((state: RootState) => state.trendingGifReducer.loading);

  const dispatch = useDispatch<AppThunkDispatch>()
  const navigate = useNavigate()

   useEffect(() => {
   dispatch(fetchTrendingGif())
  }, [dispatch]);

  const handleMemeClick = async (meme: Meme) => {
    dispatch(setSelectedMeme(meme));
    
    try {
      const similarMemes:any = await dispatch(fetchSuggestion({ term: meme.title }));
      dispatch(setSimilarMemes(similarMemes));
      navigate(`${baseURL}/selectedMem`);
    } catch (error) {
      console.error('Error fetching similar memes:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <StyledHeader>Trending Gifs</StyledHeader>
     
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MemeWrapper>
          {trendingGif.map((gif) => (
            <div key={gif.id} onClick={() => handleMemeClick(gif)}>
              <Img src={gif.images.fixed_height.url} alt={gif.title} />
            </div>
          ))}
        </MemeWrapper>
      )}
    
    </div>
  );
};

