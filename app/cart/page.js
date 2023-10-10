"use client";
import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { productState } from "../GlobalRedux/Slices/productSlice";
import Cart from "@/components/Cart";

function page() {
  const { productList } = useSelector(productState);

  return (
    <Box
      sx={{
        mt: 14,
        p: 10,
        bgcolor: "#fafafa",
      }}
    >
      {productList.length > 0 ? <Cart /> : "No item founded"}
    </Box>
  );
}

export default page;
