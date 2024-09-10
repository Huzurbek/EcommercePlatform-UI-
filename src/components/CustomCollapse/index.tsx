import { Box, Collapse, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
interface ICollapse {
  title: string;
  children: ReactNode;
  openCollapse?: boolean;
}
const CustomCollapse = (props: ICollapse) => {
  const { title, children, openCollapse = true } = props;
  const [open, setOpen] = useState(openCollapse);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ borderBottom: "1px solid #dadce0" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: "20px",
          cursor: "pointer",
        }}
        onClick={handleToggle}
      >
        <Typography sx={{ fontSize: "20px" }}>{title}</Typography>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  );
};

export default CustomCollapse;
