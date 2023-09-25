"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Box,
  AppBar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Login from "@/components/Login";
import { useDispatch, useSelector } from "react-redux";
import { authState, setIsOpenModal } from "@/app/GlobalRedux/Slices/authSlice";
import Link from "next/link";
import { productState } from "@/app/GlobalRedux/Slices/productSlice";

const drawerWidth = 240;
const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "" },
  { name: "Pages", path: "" },
  { name: "Elements", path: "" },
];

const CustomButton = ({ children, mr, ...props }) => {
  return (
    <Button
      {...props}
      className="bg-transparent fw-semibold"
      sx={{
        letterSpacing: "2px",
        color: "#080808",
        fontSize: "11px",
        "&:hover": {
          color: "#929292",
        },
        minWidth: "auto",
        mr: mr && mr,
      }}
    >
      {children}
    </Button>
  );
};

function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector(productState);
  const { user } = useSelector(authState);
  const handleOpen = () => dispatch(setIsOpenModal({ bool: true }));
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        bgcolor: "#111",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ name, path }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton sx={{ textAlign: "left", pl: 4 }}>
              <ListItemText
                primary={<Link href={path}>{name}</Link>}
                sx={{
                  "&  .MuiTypography-root": {
                    color: "#fff",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          bgcolor: "#fff",
          color: "#000",
          py: 2.2,
          px: 10,
          boxShadow: 0,
        }}
      >
        <Toolbar className="d-flex justify-content-between align-items-center">
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map(({ name, path }) => (
              <Link href={path} key={name}>
                <CustomButton mr={{ xs: 2, md: 3 }}>{name}</CustomButton>
              </Link>
            ))}
          </Box>
          <Typography
            className="fw-bold"
            variant="h5"
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, letterSpacing: "5px" }}
          >
            DEPOT
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link href="/cart">
              <CustomButton>
                Cart{" "}
                <span className="fw-light">
                  ({productList.length > 0 ? productList.length : "0"})
                </span>
              </CustomButton>
            </Link>
            <CustomButton>
              <FavoriteBorderIcon sx={{ fontSize: "15px", mr: 0.8, mb: 0.2 }} />{" "}
              <span className="fw-light">($0)</span>
            </CustomButton>
            <CustomButton onClick={handleOpen}>
              <PersonOutlineOutlinedIcon
                sx={{ fontSize: "18px", mr: 0.8, mb: 0.2 }}
              />
              {user ? user.username : "Login"}
            </CustomButton>
            <CustomButton>
              <SearchOutlinedIcon
                sx={{ transform: "rotateY(180deg)", fontSize: "18px" }}
              />
            </CustomButton>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Login />
    </Box>
  );
}

export default DrawerAppBar;
