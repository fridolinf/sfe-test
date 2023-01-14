import { LayoutInterface } from "@/Interfaces/layout/LayoutInterface";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const ProductsPage = dynamic(() => import("@/pages/products"));
const CartsPage = dynamic(() => import("@/pages/carts"));

const drawerWidth = 240;
const Layout = ({ productData, cartsData }: LayoutInterface) => {
  const [menuList, setMenuList] = useState([
    {
      name: "Products",
      isSelected: true,
    },
    {
      name: "Charts",
      isSelected: false,
    },
  ]);
  const [menuPage, setMenuPage] = useState<number>(0);

  const updateFieldChanged =
    (selectVal: boolean, index: number) => (e: any) => {
      let newMenuList = menuList.map((data, i) => {
        return {
          name: data.name,
          isSelected: data.isSelected === selectVal,
        };
      });
      setMenuList(newMenuList);
      setMenuPage(index);
    };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#e3e8ed",
            border: "2px solid #a9b6c2",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List sx={{ marginTop: 5 }}>
          {menuList.map((data, index) => (
            <ListItem key={data.name}>
              <ListItemButton
                onClick={updateFieldChanged(data.isSelected, index)}
                selected={data.isSelected}
              >
                <ListItemText primary={data.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          overflow: "auto",
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          height: "100vh",
        }}
      >
        {menuPage === 0 ? (
          <ProductsPage products={productData} />
        ) : (
          <CartsPage carts={cartsData} />
        )}
      </Box>
    </Box>
  );
};

export default Layout;
