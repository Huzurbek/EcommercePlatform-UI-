import { Box, Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect, useMemo } from "react";
import { fetchProducts } from "../../../features/products/productsApi";
import ProductCart from "../../../components/ProductCard";
import SideBar from "../../../components/SideBar/SideBar";
import { setPage } from "../../../features/products/productsSlice";

const Shop = () => {
  const { products, isLoading, pagination } = useAppSelector(
    (state) => state.productReducer
  );
  const { nestedSubcategories } = useAppSelector(
    (state) => state.categoryReducer
  );
  const dispatch = useAppDispatch();
  const { limit, page, total } = pagination;

  const catIds = useMemo(() => {
    return nestedSubcategories.length > 0
      ? nestedSubcategories.map((item) => item.categoryId)
      : [];
  }, [nestedSubcategories]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit,
        page,
        catIds: catIds.join(","),
      })
    );
  }, [dispatch, limit, page, catIds]);

  return (
    <Box display="flex" gap={4}>
      <SideBar />
      <Box flex={1}>
        {isLoading ? (
          <h1>Loading products ....</h1>
        ) : (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridGap: "20px",
              }}
            >
              {products.map((product) => (
                <ProductCart
                  key={product.productId}
                  title={product.productName}
                  price={product.productItems[0]?.originalPrice || 0}
                />
              ))}
            </Box>
            <Pagination
              count={total}
              size="large"
              page={page}
              onChange={(_, val) => {
                if (val) {
                  dispatch(setPage(val));
                }
              }}
              sx={{ mt: 2 }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Shop;
