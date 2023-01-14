import { baseUrl } from "@/common/api/baseUrl";
import { endPoint } from "@/common/api/endpoint";
import { CartsInterface } from "@/Interfaces/api/Carts/CartsInterface";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

import { CartsType } from "@/Interfaces/api/Carts/CartTypes";
import { useRouter } from "next/router";

const Carts = ({ carts }: { carts: CartsInterface }) => {
  console.log(carts, "@carts");
  const router = useRouter();
  const [cartsData, setCartsData] = useState<CartsType[] | []>(carts.carts);
  const [rowPerPage, setRowPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const onClickData = (idCarts: string) => {
    setLoading(true);
    router.push({
      pathname: "/carts/[id]",
      query: {
        id: idCarts,
      },
    });
    setLoading(false);
  };
  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    const countFetch = newPage > page ? rowPerPage + 5 : rowPerPage - 5;
    setRowPerPage(countFetch);
    const res = await fetch(
      `${baseUrl}${endPoint.carts}?skip=${countFetch}&limit=${5}
      `
    );
    const carts: CartsInterface = await res.json();
    setCartsData(carts.carts);
  };
  return (
    <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
      {loading === true ? (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress size={100} />
        </Stack>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>userId</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>total</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>totalProducts</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>totalQuantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartsData.map((data) => (
                <TableRow
                  key={data.id}
                  onClick={() => onClickData(data.id)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {data.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.userId}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.total}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.totalProducts}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.totalQuantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={carts.total}
                  rowsPerPageOptions={[5]}
                  rowsPerPage={5}
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
        </TableContainer>
      )}
    </Box>
  );
};

export default Carts;
