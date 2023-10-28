import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const API_KEY = 'DoPGRvp1BVmbGNWdzUyfgiE8gWA2TH0S';
const BASE_URL = 'https://api.giphy.com/v1/gifs/';



export const fetchMemes = createAsyncThunk('search/fetchMemes', async ({ searchTerm }: { searchTerm: string; }) => {
  try {
    
    const response = await axios.get(`${BASE_URL}search?q=${searchTerm}&api_key=${API_KEY}`);
    return {
      memes: response.data.data,
     
    };
  } catch (error: any) {
    throw error.response?.data?.message || 'Error fetching memes';
  }
});


export const getRandomGif = async (): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}random?api_key=${API_KEY}`);
    const data = await response.json();
    const gifUrl = data.data.images.original.url;
    return gifUrl || 'default_url_if_empty';
  } catch (error) {
    console.error('Error fetching random gif:', error);
    return 'default_url_if_error';
  }
};



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
    const response = await axios.get(`${BASE_URL}trending?api_key=${API_KEY}`)
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
    const response = await axios.get(`${BASE_URL}search?api_key=${API_KEY}&offset=0&rating=g&lang=en&q=${categoryId}`);
    return response.data.data.map((category: any) => category.name);
  } catch (error: any) {
    throw error.response?.data?.message || 'Error fetching categories';
  }
});
