import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div>About</div>
      <div>Contact</div>
      <div>Home</div>
      <Button variant="contained" onClick={() => navigate("/basket")}>
        Basket
      </Button>
    </div>
  );
};

export default Navbar;
