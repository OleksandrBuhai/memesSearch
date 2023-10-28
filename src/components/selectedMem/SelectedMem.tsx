import { useDispatch, useSelector } from "react-redux"
import { setSelectedMeme } from "../../slices/searchSlice/searchSlice"
import { Img } from "../../styles/Img"
import { Meme } from "../../types/types"
import SearchSuggestions from "../suggestionList/Suggestion"
import { RootState } from "../../slices/store"
import { StyledHeader } from "../../styles/HeaderTextStyle"



export const SelectedMem:React.FC  = () => {


    const { selectedMeme } = useSelector((state: RootState) => state.searchReducer);

    const dispatch = useDispatch()

    const onHandleClick = (meme: Meme) => {
        dispatch(setSelectedMeme(meme))
      }
    

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <StyledHeader>Selected Meme</StyledHeader>
        <Img
            src={selectedMeme!.images.fixed_height.url}
            alt={selectedMeme!.title}

        />
        <div style={{display:'flex', flexDirection:'column'}}>
        <p style={{fontSize:'2rem', color:'white'}}>{selectedMeme!.title}</p>
        <p style={{fontSize:'2rem',color:'white'}}><a 
        style={{textDecoration:'none', color:'white'}}
        href={selectedMeme?.source}>Go to {selectedMeme!.source}</a></p>
        </div>
        <SearchSuggestions term={selectedMeme!.term} onMemeClick={onHandleClick} />
    </div>
    )
}