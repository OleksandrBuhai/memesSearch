import { fetchCategories } from '@/api/api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';


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
    builder
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error fetching memes';
    })
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
  },

  
});

export const { selectCategory } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
