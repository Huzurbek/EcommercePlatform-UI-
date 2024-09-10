import { Box } from "@mui/material";
import CustomCollapse from "../CustomCollapse";
import CategorySidebar from "./CategorySideBar";
import BrandSideBar from "./BrandSideBar";

const SideBar = () => {
  return (
    <Box sx={{ flexBasis: "25%", pb: 5 }}>
      <CustomCollapse title="Категории">
        <CategorySidebar />
      </CustomCollapse>
      <CustomCollapse title="Бренд">
        <BrandSideBar />
      </CustomCollapse>
      <CustomCollapse title="Цена">
        <ul>
          <li>45</li>
          <li>41</li>
        </ul>
      </CustomCollapse>
    </Box>
  );
};

export default SideBar;
