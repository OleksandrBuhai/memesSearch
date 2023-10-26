import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CurrentCategoryState {
  content: any[]; 
  loading: boolean;
  error: string | null;
}

const initialCurrentCategoryState: CurrentCategoryState = {
  content: [],
  loading: false,
  error: null,
};




const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState: initialCurrentCategoryState,
  reducers: {
    fetchCategoryContentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoryContentSuccess: (state, action: PayloadAction<any[]>) => {
      state.content = action.payload;
      state.loading = false;
    },
    fetchCategoryContentFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchCategoryContentStart, fetchCategoryContentSuccess, fetchCategoryContentFailure } = currentCategorySlice.actions;
export const currentCategoryReducer = currentCategorySlice.reducer;


