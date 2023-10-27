import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppThunkDispatch, RootState } from '../../../slices/store';
import { fetchCategories, getRandomGif } from '../../../api/api';
import { CategoriesWrapper, CategoryColumn, CategoryItem, CategoryGrid } from '../styles/Styles';

interface GifCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const GifCategoriesList: React.FC<GifCategoriesProps> = ({ onSelectCategory }) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const categories = useSelector((state: RootState) => state.categoriesReducer.categories);
  const [categoryGifs, setCategoryGifs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchCategoryGif = async (category: string) => {
      try {
        const gif = await getRandomGif();
        setCategoryGifs(prevState => ({
          ...prevState,
          [category]: gif,
        }));
      } catch (error) {
        console.error(`Error fetching gif for ${category}:`, error);
      }
    };

    categories.forEach(category => {
      fetchCategoryGif(category);
    });
  }, [categories]);

  return (
    <div>
      <h2>Categories</h2>
      <CategoriesWrapper>
        <CategoryColumn>
          {categories.map(category => (
            <div key={category} onClick={() => onSelectCategory(category)}>
              {category}
            </div>
          ))}
        </CategoryColumn>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryItem
              key={category}
              onClick={() => onSelectCategory(category)}
              gifUrl={categoryGifs[category] || ''}
            >
              <p>{category}</p>
            </CategoryItem>
          ))}
        </CategoryGrid>
      </CategoriesWrapper>
    </div>
  );
};
