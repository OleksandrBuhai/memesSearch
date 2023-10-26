import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoriesSlice/categorieListSlice";
import { useDispatch } from "react-redux";
import { currentCategoryReducer } from "./categoriesSlice/categoriesSelectSlice";
import { searchReducer } from "./searchSlice/searchSlice";
import { suggestionReducer } from "./suggestionSlice/suggestionSlice";
import { trendingGifReducer } from "./trendSlice/trendingSLice";


export const store = configureStore({
    reducer: {
        searchReducer,
        suggestionReducer,
        trendingGifReducer,
        categoriesReducer,
        currentCategoryReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();