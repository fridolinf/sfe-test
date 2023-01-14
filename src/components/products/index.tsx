import { baseUrl } from "@/common/api/baseUrl";
import { endPoint } from "@/common/api/endpoint";
import { ProductInterface } from "@/Interfaces/api/Products/ProductInterface";
import { ProductType } from "@/Interfaces/api/Products/ProductType";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import React, { useEffect, useState } from "react";

const Products = ({ products }: { products: ProductInterface }) => {
  const [productsData, setProductsData] = useState<ProductType[] | []>(
    products.products
  );
  const [categories, setCategories] = useState([]);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [brandFilter, setBrandFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [categoriesFilter, setCategoriesFilter] = useState<string>("");
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const searchProducts = async (val: string) => {
    const getSearchData = await fetch(
      `${baseUrl}${endPoint.products}${endPoint.search}?q=${val}`
    );
    const listData: ProductInterface = await getSearchData.json();

    setProductsData(listData.products);
  };

  const fetchCategories = async () => {
    const fetchCategories = await fetch(
      `${baseUrl}${endPoint.products}${endPoint.category}`
    );
    const listCategories = await fetchCategories.json();
    setCategories(listCategories);
  };

  const handleTitleChange = (event: SelectChangeEvent) => {
    setTitleFilter(event.target.value as string);
  };

  const handleBrandChange = (event: SelectChangeEvent) => {
    setBrandFilter(event.target.value as string);
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    setPriceFilter(event.target.value as string);
  };

  const handleCategoriesChange = (event: SelectChangeEvent) => {
    setCategoriesFilter(event.target.value as string);
  };

  const applyFilter = async () => {
    const filterData = productsData.filter((data) => {
      if (
        data.title === titleFilter ||
        data.brand === brandFilter ||
        data.price.toString() === priceFilter ||
        data.category === categoriesFilter
      ) {
        return data;
      }
    });
    setProductsData(filterData);
  };

  const handleChangePage = async (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    const countFetch = newPage > page ? rowPerPage + 10 : rowPerPage - 10;
    setRowPerPage(countFetch);
    const res = await fetch(
      `${baseUrl}${endPoint.products}?skip=${countFetch}&limit=${10}
      `
    );
    const products: ProductInterface = await res.json();
    setProductsData(products.products);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
      <FormControl sx={{ alignItems: "flex-end", display: "flex" }}>
        <OutlinedInput
          placeholder="Search Product"
          sx={{ width: "30%" }}
          onChange={(e) => searchProducts(e.target.value)}
        />
        {/* <MyFormHelperText /> */}
      </FormControl>
      <Box border="1px solid gray" padding={2} marginTop={3}>
        <Typography textAlign="center">Filter Data</Typography>
        <Grid
          marginTop={3}
          container
          justifyContent="space-between"
          columns={{ xs: 4, md: 12 }}
        >
          {/* Title  */}
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel>Title</InputLabel>
              <Select
                value={titleFilter}
                label="Title"
                onChange={handleTitleChange}
              >
                {products &&
                  products.products.map((data) => (
                    <MenuItem key={data.id} value={data.title}>
                      {data.title}
                    </MenuItem>
                  ))}
                {/* </div> */}
              </Select>
            </FormControl>
          </Grid>
          {/* Brand */}
          <Grid item xs={5} marginTop={{ xs: 3, lg: 0, md: 0, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                value={brandFilter}
                label="Brand"
                onChange={handleBrandChange}
              >
                {products &&
                  products.products.map((data) => (
                    <MenuItem key={data.id} value={data.brand}>
                      {data.brand}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Price */}
          <Grid marginTop={3} item xs={5}>
            <FormControl fullWidth>
              <InputLabel>Price</InputLabel>
              <Select
                value={priceFilter}
                label="Title"
                onChange={handlePriceChange}
              >
                {products &&
                  products.products.map((data) => (
                    <MenuItem key={data.id} value={data.price}>
                      {data.price}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Category */}
          <Grid marginTop={3} item xs={5}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoriesFilter}
                label="Brand"
                onChange={handleCategoriesChange}
              >
                {categories.map((_, i) => (
                  <MenuItem key={i} value={categories[i]}>
                    {categories[i]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          marginTop={{ xs: 3, lg: 0, md: 0, sm: 3 }}
        >
          <Button onClick={applyFilter} variant="contained">
            Apply
          </Button>
        </Grid>
      </Box>

      <TableContainer sx={{ marginTop: 2 }} component={Paper}>
        {productsData.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData.map((data, index) => (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.brand}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.price}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.stock}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.category}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={products.total}
                  rowsPerPageOptions={[10]}
                  rowsPerPage={10}
                  labelRowsPerPage=""
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <Typography textAlign="center" padding={5}>
            NO DATA
          </Typography>
        )}
      </TableContainer>
    </Box>
  );
};

export default Products;
