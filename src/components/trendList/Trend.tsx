import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestion, fetchTrendingGif } from '../../api/api';
import { AppThunkDispatch, RootState } from '../../slices/store';
import { setSelectedMeme, setSimilarMemes } from '../../slices/searchSlice/searchSlice';
import { Meme } from '../../types/types';
import { Img } from '../../styles/Img';
import { MemeWrapper } from '../../styles/MemeWrapper';
import { useNavigate } from 'react-router-dom';
import { StyledHeader } from '../../styles/HeaderTextStyle';
import { baseURL } from '../../router';

interface TrendingGifsType {
 
}

const TrendingGifs: React.FC<TrendingGifsType> = ({}) => {

  const trendingGif = useSelector((state:RootState)=> state.trendingGifReducer.trendingGifs) 

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
     
        <MemeWrapper >
          {trendingGif.map((gif) => (
            <div key={gif.id}  onClick={() => handleMemeClick(gif)}>

              <Img
                src={gif.images.fixed_height.url}
                alt={gif.title} 
              />
            </div>
          ))}
        </MemeWrapper>
    
    </div>
  );
};

export default TrendingGifs;