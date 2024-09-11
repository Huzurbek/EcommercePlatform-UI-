import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchBrands } from "../../features/brands/brandsApi";
import { setSelectedBrandIds, TBrand } from "../../features/brands/brandsSlice";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
} from "@mui/material";

const BrandSideBar = () => {
  const { brands, selectedBrandIds } = useAppSelector(
    (state) => state.brandReducer
  );
  const dispatch = useAppDispatch();
  const [visiable, setVisiable] = useState(10);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleChange = (brandId: number) => {
    dispatch(setSelectedBrandIds(brandId));
  };

  return (
    <>
      <List>
        <FormGroup>
          {brands.slice(0, visiable).map((item) => (
            <BrandItem
              key={item.brandId}
              item={item}
              handleChange={handleChange}
              selectedBrands={selectedBrandIds}
            />
          ))}
        </FormGroup>
      </List>
      <Box ml="23px" mb="10px">
        <Button
          variant="text"
          color="secondary"
          onClick={() => setVisiable(visiable <= 10 ? brands.length : 10)}
        >
          {visiable <= 10 ? "Load more.." : "Show less"}
        </Button>
      </Box>
    </>
  );
};

export default BrandSideBar;

const BrandItem = ({
  item,
  handleChange,
  selectedBrands,
}: {
  item: TBrand;
  handleChange: (value: number) => void;
  selectedBrands: number[];
}) => {
  return (
    <ListItem
      sx={{
        padding: 0,
        display: "flex",
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedBrands.includes(item.brandId)}
            onChange={() => handleChange(item.brandId)}
          />
        }
        label={item.brandName}
        sx={{ marginLeft: "23px" }}
      />
    </ListItem>
  );
};
