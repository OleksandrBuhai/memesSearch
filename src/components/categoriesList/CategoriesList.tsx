import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GifCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const GifCategoriesList: React.FC<GifCategoriesProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('https://api.giphy.com/v1/gifs/categories?api_key=DoPGRvp1BVmbGNWdzUyfgiE8gWA2TH0S');
          const categoryData = response.data.data.map((category: any) => category.name);
          setCategories(categoryData);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      fetchCategories();
    }, []);
  
    return (
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category} onClick={() => onSelectCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
};


