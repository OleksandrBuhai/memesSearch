import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchMemes } from '../../api/api';
import { Meme } from '../../types/types';


interface SearchState {
  memes: Meme[];
  searchTerm: string;
  page: number;
  totalPages: number;
  selectedMeme: Meme | null;
  loading: boolean;
  error: string | null;
  similarMeme:Meme[],
}

const initialState: SearchState = {
  memes: [],
  searchTerm: '',
  page: 1,
  totalPages: 1,
  selectedMeme: null,
  loading: false,
  error: null,
  similarMeme: []
};


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSelectedMeme: (state, action: PayloadAction<Meme | null>) => {
      state.selectedMeme = action.payload;
    },
    setSimilarMemes: (state, action: PayloadAction<Meme[]>) => {
      state.similarMeme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.memes = action.payload.memes;
        
        state.loading = false;
        state.selectedMeme = null;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching memes';
      });
  },
});

export const { setSearchTerm, setPage, setSelectedMeme, setSimilarMemes} = searchSlice.actions;

export const searchReducer =  searchSlice.reducer;