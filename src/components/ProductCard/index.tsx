import { Box, Card, CardContent, Typography } from "@mui/material";
interface IProductCartProps {
  title: string;
  price: number;
}
const ProductCart = ({ title, price }: IProductCartProps) => {
  return (
    <Card>
      <Box
        sx={{
          background: `url(https://cdn.pixabay.com/photo/2018/11/12/15/07/walnut-3811077_1280.jpg) no-repeat center center`,
          backgroundSize: "cover",
          width: "100%",
          height: "150px",
        }}
      />
      <CardContent>
        <Typography sx={{ textAlign: "center", fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography sx={{ textAlign: "center" }}>$ {price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCart;
