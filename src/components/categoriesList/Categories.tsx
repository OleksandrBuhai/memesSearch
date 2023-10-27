import { useState } from "react";
import { GifCategories } from "./CategoriesGif/CategoriesGif"
import { GifCategoriesList } from "./CategoriesList/CategoriesList"



export const Categories:React.FC = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    return (
        <>
        <GifCategoriesList onSelectCategory={setSelectedCategoryId}/>
        <GifCategories selectedCategoryId={selectedCategoryId}/>
        </>
    )
}