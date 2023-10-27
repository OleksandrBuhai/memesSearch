import { useDispatch, useSelector } from "react-redux"
import { setSelectedMeme } from "../../slices/searchSlice/searchSlice"
import { Img } from "../../styles/Img"
import { Meme } from "../../types/types"
import SearchSuggestions from "../suggestionList/Suggestion"
import { RootState } from "../../slices/store"



export const SelectedMem:React.FC  = () => {


    const { selectedMeme } = useSelector((state: RootState) => state.searchReducer);

    const dispatch = useDispatch()

    const onHandleClick = (meme: Meme) => {
        dispatch(setSelectedMeme(meme))
      }
    

    return (
        <div>
        <h2>Selected Meme</h2>
        <Img
            src={selectedMeme!.images.fixed_height.url}
            alt={selectedMeme!.title}

        />
        <p>{selectedMeme!.title}</p>
        <p>{selectedMeme!.source}</p>
        <SearchSuggestions term={selectedMeme!.term} onMemeClick={onHandleClick} />
    </div>
    )
}