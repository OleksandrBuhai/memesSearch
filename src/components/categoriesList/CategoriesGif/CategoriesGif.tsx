import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoryContentFailure, fetchCategoryContentStart } from '../../../slices/categoriesSlice/categoriesSelectSlice';
import { AppThunkDispatch } from '../../../slices/store';
import { MemeWrapper } from '../../../styles/MemeWrapper';
import { Img } from '../../../styles/Img';
import { useNavigate } from 'react-router-dom';
import { setSelectedMeme } from '../../../slices/searchSlice/searchSlice';
import { Meme } from '../../../types/types';

interface GifListProps {
  selectedCategoryId: string | null;
}

export const GifCategories: React.FC<GifListProps> = ({ selectedCategoryId }) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();

  const [categoryGifs, setCategoryGifs] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategoryGifs = async () => {
      if (selectedCategoryId) {
        try {
          dispatch(fetchCategoryContentStart());
          const response = await axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=DoPGRvp1BVmbGNWdzUyfgiE8gWA2TH0S&limit=5&offset=0&rating=g&lang=en&q=${selectedCategoryId}`
          );
          const gifs = response.data.data.map((gif: any) => gif.images.original.url);
          setCategoryGifs(gifs);
        } catch (error) {
          console.error('Error fetching GIFs for category:', error);
          dispatch(fetchCategoryContentFailure('Error fetching GIFs for category'));
        }
      }
    };

    fetchCategoryGifs();
  }, [selectedCategoryId, dispatch]);

  const handleImgClick = (selectedMemeUrl: string) => {
    const selectedMeme: Meme = {
      id: 'uniqueId',
      title: 'GIF Title', 
      term: 'GIF Term', 
      source: 'GIF Source', 
      images: { fixed_height: { url: selectedMemeUrl } },
    };
  
    dispatch(setSelectedMeme(selectedMeme));
    navigate('/selecetedMem');
  };

  return (
    <div>
      <h2>GIFs for Category: {selectedCategoryId}</h2>
      <MemeWrapper>
        {categoryGifs.map((gifUrl) => (
          <div key={gifUrl} onClick={() => handleImgClick(gifUrl)}>
            <Img src={gifUrl} alt="GIF" />
          </div>
        ))}
      </MemeWrapper>
    </div>
  );
};