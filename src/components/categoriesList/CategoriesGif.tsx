import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface GifListProps {
    selectedCategoryId: string | null;
  }

export const GifCategories: React.FC<GifListProps> = ({ selectedCategoryId }) => {
    const [categoryGifs, setCategoryGifs] = useState<string[]>([]);

    useEffect(() => {
      const fetchCategoryGifs = async () => {
        if (selectedCategoryId) {
          try {
            const response = await axios.get(
              `https://api.giphy.com/v1/gifs/search?api_key=DoPGRvp1BVmbGNWdzUyfgiE8gWA2TH0S&limit=5&offset=0&rating=g&lang=en&q=${selectedCategoryId}`
            );
  
            const gifs = response.data.data.map((gif: any) => gif.images.original.url);
            setCategoryGifs(gifs);
          } catch (error) {
            console.error('Error fetching GIFs for category:', error);
          }
        }
      };
  
      fetchCategoryGifs();
    }, [selectedCategoryId]);
  
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


