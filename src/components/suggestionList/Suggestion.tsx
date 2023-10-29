import { fetchSuggestion } from '@/api/api';
import { setSelectedMeme, setSimilarMemes } from '@/slices/searchSlice/searchSlice';
import { RootState, AppThunkDispatch } from '@/slices/store';
import { StyledHeader } from '@/styles/HeaderTextStyle';
import { Img } from '@/styles/Img';
import { MemeWrapper } from '@/styles/MemeWrapper';
import { Meme } from '@/types/types';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface SearchSuggestionsProps {
  onMemeClick: (meme: Meme) => void;
  term: string;
}




export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({  term, onMemeClick }) => {
 
    const suggestions = useSelector((state:RootState)=> state.suggestionReducer.suggestions)

    const dispatch = useDispatch<AppThunkDispatch>();

    useEffect(()=>{
      dispatch(fetchSuggestion({term}))
      
    },[dispatch,term])

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
      <StyledHeader>Search Suggestions</StyledHeader>
    
        <MemeWrapper>
          {suggestions.map((gif) => (
            <div key={gif.id} onClick={()=>handleMemeClick(gif)}>
              
              <Img src={gif.images.fixed_height.url} alt={gif.title} />
              
            </div>
          ))}
        </MemeWrapper>
    
    
    </div>
  );
};

