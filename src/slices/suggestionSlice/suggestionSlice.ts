import { fetchSuggestion } from '@/api/api';
import { Meme } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';




interface SearchSuggestionsState {
  suggestions:  Meme[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchSuggestionsState = {
  suggestions: [],
  loading: false,
  error: null,
};



const searchSuggestionsSlice = createSlice({
  name: 'searchSuggestions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.suggestions = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching search suggestions';
      });
  },
})


export const suggestionReducer = searchSuggestionsSlice.reducer 