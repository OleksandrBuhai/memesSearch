import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { baseURL } from "@/router";
import { RootState } from "@/slices/store";
import { Categories } from "../categoriesList/Categories";
import {MemeList} from "../memeList/MemeList";
import { SelectedMem } from "../selectedMem/SelectedMem";
import {TrendingGifs} from "../trendList/Trend";


export const Main: React.FC = () => {


    const { selectedMeme } = useSelector((state: RootState) => state.searchReducer);


    return (
       <Routes>
            
            <Route path={`${baseURL}`} element={<TrendingGifs />} />
            <Route path={`${baseURL}/categories`} element={<Categories />} />
            <Route path={`${baseURL}/searchable`} element={<MemeList />} />
            {selectedMeme && (
                <Route path={`${baseURL}/selectedMem`} element={<SelectedMem />} />
            )}
        </Routes>
    )
}