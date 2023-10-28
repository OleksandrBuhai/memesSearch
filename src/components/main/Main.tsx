import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "../../slices/store";
import { Categories } from "../categoriesList/Categories";
import MemeList from "../memeList/MemeList";
import { SelectedMem } from "../selectedMem/SelectedMem";
import TrendingGifs from "../trendList/Trend";
import { baseURL } from "../../router";


export const Main: React.FC = () => {


    const { selectedMeme } = useSelector((state: RootState) => state.searchReducer);


    return (
       <Routes>
            {/* Змініть шлях на '/' */}
            <Route path={`${baseURL}`} element={<TrendingGifs />} />
            <Route path={`${baseURL}/categories`} element={<Categories />} />
            <Route path={`${baseURL}/searchable`} element={<MemeList />} />
            {selectedMeme && (
                <Route path={`${baseURL}/selectedMem`} element={<SelectedMem />} />
            )}
        </Routes>
    )
}