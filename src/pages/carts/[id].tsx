import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { baseUrl } from "@/common/api/baseUrl";
import { endPoint } from "@/common/api/endpoint";
import { CartsType } from "@/Interfaces/api/Carts/CartTypes";
import { ArrowBack } from "@mui/icons-material";

const Index = ({ products }: CartsType) => {
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
          <Grid container justifyContent="space-around" marginTop={2}>
            <Typography>
              User:{" "}
              <Typography component="span" fontWeight="bold">
                {products.userId}
              </Typography>
            </Typography>
            <Typography>
              Total:{" "}
              <Typography component="span" fontWeight="bold">
                {products.total}
              </Typography>
            </Typography>
            <Typography>
              Total Products:{" "}
              <Typography component="span" fontWeight="bold">
                {products.totalProducts}
              </Typography>
            </Typography>
            <Typography>
              Discounted Total:{" "}
              <Typography component="span" fontWeight="bold">
                {products.discountedTotal}
              </Typography>
            </Typography>
          </Grid>
          <Grid
            container
            justifyContent="space-around"
            columnSpacing={4}
            rowSpacing={4}
            marginTop={5}
          >
            {products.products.map((data) => (
              <Card key={data.id} sx={{ marginTop: 3 }}>
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
