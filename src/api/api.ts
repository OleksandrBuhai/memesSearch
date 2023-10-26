import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const API_KEY = 'DoPGRvp1BVmbGNWdzUyfgiE8gWA2TH0S';
const BASE_URL = 'https://api.giphy.com/v1/gifs/';



export const fetchMemes = createAsyncThunk('search/fetchMemes', async ({ searchTerm, page }: { searchTerm: string; page: number }) => {
  try {
    const limit = 10;
    const response = await axios.get(`${BASE_URL}search?q=${searchTerm}&api_key=${API_KEY}&limit=${limit}&offset=${(page - 1) * limit}`);
    return {
      memes: response.data.data,
      totalPages: Math.ceil(response.data.pagination.total_count / limit),
    };
  } catch (error: any) {
    throw error.response?.data?.message || 'Error fetching memes';
  }
});


export const fetchSuggestion = createAsyncThunk('search/suggestion', async ({ term }: { term: string }) => {
  try {
    const response = await axios.get(`${BASE_URL}search?q=${encodeURIComponent(term)}&api_key=${API_KEY}`)
    console.log(response)
    return response.data.data
  }
  catch (error: any) {
    throw error.response?.data?.message || 'Error fetching memes';
  }
});


export const fetchTrendingGif = createAsyncThunk('search/trending', async () => {
  try {
    const response = await axios.get(`${BASE_URL}trending?api_key=${API_KEY}&limit=30`)
    return response.data.data
  }
  catch (error: any) {
    throw error.response?.data?.message || 'Error fetching memes';
  }
});


export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await axios.get(`${BASE_URL}categories?api_key=${API_KEY}`);
    return response.data.data.map((category: any) => category.name);
  } catch (error: any) {
    throw error.response?.data?.message || 'Error fetching categories';
  }
});


export const fetchCategoriesContent = createAsyncThunk('categories/fetchCategories', async (categoryId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}search?api_key=${API_KEY}&limit=5&offset=0&rating=g&lang=en&q=${categoryId}`);
    return response.data.data.map((category: any) => category.name);
  } catch (error: any) {
    throw error.response?.data?.message || 'Error fetching categories';
  }
});
