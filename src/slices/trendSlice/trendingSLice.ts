import { fetchTrendingGif } from '@/api/api';
import { createSlice } from '@reduxjs/toolkit';


interface TrendingGifsState {
  trendingGifs: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TrendingGifsState = {
  trendingGifs: [],
  loading: false,
  error: null,
};


const trendingGifsSlice = createSlice({
    name: 'trendingGifs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTrendingGif.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTrendingGif.fulfilled, (state, action) => {
          state.trendingGifs = action.payload;
          state.loading = false;
        })
        .addCase(fetchTrendingGif.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Error fetching trending gifs';
        });
    },
  });
  
  export const trendingGifReducer = trendingGifsSlice.reducer;