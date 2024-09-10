import axios from "axios";
import { TCategory } from "../features/categories/categoriesSlice";

export type Category = TCategory & {
  isParent: boolean;
};
export const fetchCategories = async (): Promise<Category[] | null> => {
  try {
    const { data } = await axios.get<{ data: Category[] }>(
      "http://localhost:3001/api/category"
    );
    const rootCategories = data.data.filter(
      (category) => category.parentCategoryId === null
    );
    return rootCategories;
  } catch (err) {
    console.error("Error fetching categories", err);
    return null;
  }
};
export const fetchSubCategories = async (
  categoryId: number
): Promise<Category[] | null> => {
  try {
    const { data } = await axios.get<{ data: Category[] }>(
      `http://localhost:3001/api/category/${categoryId}`
    );
    return data.data;
  } catch (err) {
    console.error("Error fetching sub-categories", err);
    return null;
  }
};
