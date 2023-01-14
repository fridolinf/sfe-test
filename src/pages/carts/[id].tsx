import { baseUrl } from "@/common/api/baseUrl";
import { endPoint } from "@/common/api/endpoint";
import { CartsType } from "@/Interfaces/api/Carts/CartTypes";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const Index = ({ products }: { products: CartsType }) => {
  const router = useRouter();
  return (
    <Container fixed>
      <Box sx={{ bgcolor: "#ffff", height: "100vh" }} padding={4}>
        <IconButton onClick={() => router.back()}>
          <ArrowBack height={10} />
        </IconButton>
        <Typography textAlign="center">
          Detail Carts ID : {"  "}
          <Typography component="span" fontWeight="bold">
            {products.id}
          </Typography>
          <Grid container justifyContent="space-between" marginTop={2}>
            <Typography>User: {products.userId}</Typography>
            <Typography>Total: {products.total}</Typography>
            <Typography>Total Products: {products.totalProducts}</Typography>
            <Typography>
              Discounted Total: {products.discountedTotal}
            </Typography>
          </Grid>
          <Typography
            textAlign="center"
            marginTop={3}
            fontSize={24}
            fontWeight="bold"
          >
            LIST PRODUCTS
          </Typography>
          <Grid
            container
            justifyContent="space-evenly"
            columnSpacing={3}
            rowSpacing={4}
            marginTop={5}
          >
            {products.products.map((data) => (
              <Card key={data.id} sx={{ marginTop: 1 }}>
                <CardContent>
                  <Typography
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={16}
                  >
                    {data.title}
                  </Typography>
                  <br />
                  <Typography textAlign="left">Price: {data.price}</Typography>
                  <Typography textAlign="left">
                    Quantity: {data.quantity}
                  </Typography>
                  <Typography textAlign="left">
                    Discount Percentage: {data.discountPercentage}
                  </Typography>
                  <Typography textAlign="left">
                    Discounted Price: {data.discountedPrice}
                  </Typography>
                  <Typography textAlign="left">Total: {data.total}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Typography>
      </Box>
    </Container>
  );
};

Index.getInitialProps = async ({ query }: any) => {
  const cartsId = query.id;
  const getDetailCarts = await fetch(`${baseUrl}${endPoint.carts}/${cartsId}`);
  const cartData = await getDetailCarts.json();
  return {
    products: cartData,
  };
};

export default Index;
