import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoryContentFailure, fetchCategoryContentStart } from '../../slices/categoriesSlice/categoriesSelectSlice';
import { AppThunkDispatch } from '../../slices/store';


interface GifListProps {
  selectedCategoryId: string | null;
}

export const GifCategories: React.FC<GifListProps> = ({ selectedCategoryId }) => {

  const dispatch = useDispatch<AppThunkDispatch>()

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

  return (
    <div>
      <h2>GIFs for Category: {selectedCategoryId}</h2>
      <ul>
        {categoryGifs.map((gifUrl) => (
          <li key={gifUrl}>
            <img src={gifUrl} alt="GIF" />
          </li>
        ))}
      </ul>
    </div>
  );
};


