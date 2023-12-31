import { baseURL } from "@/router";
import { setSelectedMeme } from "@/slices/searchSlice/searchSlice";
import { RootState } from "@/slices/store";
import { Img } from "@/styles/Img";
import { Meme } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";




export const MemeList: React.FC= () => {


  const { memes } = useSelector((state: RootState) => state.searchReducer);

  const dispatch = useDispatch()
  const navigate = useNavigate()
     



  const onHandleClick = (meme: Meme) => {
    dispatch(setSelectedMeme(meme))
    navigate(`${baseURL}/selectedMem`);
  }


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
          {memes.map((meme) => (
            <div key={meme.id} style={{ margin: '10px', cursor: 'pointer' }} onClick={() => onHandleClick(meme)}>
            
              {meme.images && meme.images.fixed_height && meme.images.fixed_height.url ? (
               <Img
                  src={meme.images.fixed_height.url}
                  alt={meme.title}
                  
                />
              ) : (
                <div style={{ width: '200px', height: '200px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p>No image available</p>
                </div>
              )}
            </div>
          ))}
        </div>
      );
};


