import { useEffect } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchBrands } from "../../features/brands/brandsApi";
import { TBrand } from "../../features/brands/brandsSlice";

const BrandSideBar = () => {
  const { brands } = useAppSelector((state) => state.brandReducer);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <List>
      {brands.map((item) => (
        <BrandItem
          key={item.brandId}
          item={item}
          onClick={(val) => console.log("brand is clicked", val)}
        />
      ))}
    </List>
  );
};

export default BrandSideBar;

const BrandItem = ({
  item,
  onClick,
}: {
  item: TBrand;
  onClick: (item: TBrand) => void;
}) => {
  return (
    <ListItem
      sx={{
        padding: 0,
        display: "flex",
      }}
    >
      <ListItemButton
        onClick={() => onClick(item)}
        sx={{
          padding: "6px 8px",
          borderRadius: "4px",
          maxWidth: "fit-content",
          marginLeft: "23px",
        }}
      >
        {item.brandName}
      </ListItemButton>
    </ListItem>
  );
};
