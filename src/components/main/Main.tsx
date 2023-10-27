import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "../../slices/store";
import { Categories } from "../categoriesList/Categories";
import MemeList from "../memeList/MemeList";
import { SelectedMem } from "../selectedMem/SelectedMem";
import TrendingGifs from "../trendList/Trend";



export const Main: React.FC = () => {


    const {selectedMeme } = useSelector((state: RootState) => state.searchReducer);


    return (
        <>
            <Routes>
                <Route path="/" element={<TrendingGifs />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/seacrhable" element={<MemeList />} />
                {selectedMeme && (
        
               <Route path="/selecetedMem" element={<SelectedMem/>} />
 
             )}
            </Routes>

        </>
    )
}