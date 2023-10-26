import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppThunkDispatch, RootState } from '../../slices/store';
import { fetchCategories } from '../../api/api';

interface GifCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const GifCategoriesList: React.FC<GifCategoriesProps> = ({ onSelectCategory }) => {
  const dispatch = useDispatch<AppThunkDispatch>()

  const categories = useSelector((state: RootState) => state.categoriesReducer.categories);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


 

  return (
    <div>
      <h2>Categories</h2>
      <div style={{display:'flex', flexDirection:'row' , gap:'5px', justifyItems:'center', alignItems:'center'}}>
        {categories.map((category) => (
          <p key={category} onClick={() => onSelectCategory(category)}>
            {category}
          </p>
        ))}
      </div>
    </div>
  );
};


