import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../../api/api';

interface CategoriesState {
  selectedCategory: string | null;
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  selectedCategory: null,
  categories: [],
  loading: false,
  error: 'error',
};



const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    });
  },

  
});

export const { selectCategory } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
