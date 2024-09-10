import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { List, ListItem, ListItemButton } from "@mui/material";
import {
  Category,
  fetchCategories,
  fetchSubCategories,
} from "../../services/category-service";
import { useAppDispatch } from "../../hooks/redux";
import { fetchNestedSubcategoriesById } from "../../features/categories/categoriesApi";
import { clearNestedSubcategories } from "../../features/categories/categoriesSlice";

const CategorySidebar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    Record<number | string, Category>
  >({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await fetchCategories();
      if (response) {
        setCategories(response);
      }
    };
    getAllCategories();
  }, []);

  const handleCategoryClick = async (category: Category) => {
    const subCategories = await fetchSubCategories(category.categoryId);

    if (subCategories && subCategories.length) {
      setSelectedCategories((prev) => ({
        ...prev,
        [category.categoryId]: category,
      }));
      setCategories(subCategories);
    }
  };
  const handleAllCategories = async () => {
    const categories = await fetchCategories();
    if (categories && categories.length) {
      setCategories(categories);
      setSelectedCategories({});
    }
    dispatch(clearNestedSubcategories());
  };

  const handleNestedAllCats = (id: number) => {
    if (id) dispatch(fetchNestedSubcategoriesById(id));
  };
  const parentCategorList = Object.values(selectedCategories);
  return (
    <>
      <List>
        {parentCategorList.length > 0 &&
          [
            {
              categoryName: "All Categories",
              categoryId: -1,
              parentCategoryId: null,
              isParent: true,
            },
            ...parentCategorList,
          ].map((parentCategory) => (
            <CategoryItem
              key={parentCategory.categoryId}
              category={{ ...parentCategory, isParent: true }}
              onClick={
                parentCategory.categoryId === -1
                  ? handleAllCategories
                  : handleCategoryClick
              }
            />
          ))}
        {categories.map((category) => (
          <CategoryItem
            key={category.categoryId}
            category={{ ...category, isParent: false }}
            onClick={(val) => {
              handleCategoryClick(val);
              handleNestedAllCats(val.categoryId);
            }}
          />
        ))}
      </List>
    </>
  );
};

export default CategorySidebar;
const CategoryItem: React.FC<{
  category: Category;
  onClick: (category: Category) => void;
}> = ({ category, onClick }) => {
  return (
    <ListItem
      sx={{
        padding: 0,
        display: "flex",
      }}
    >
      {category.isParent && <ChevronLeftIcon />}
      <ListItemButton
        onClick={() => onClick(category)}
        sx={{
          padding: "6px 8px",
          borderRadius: "4px",
          maxWidth: "fit-content",
          marginLeft: !category.isParent ? "23px" : 0,
        }}
      >
        {category.categoryName}
      </ListItemButton>
    </ListItem>
  );
};
