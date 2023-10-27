"use client";
import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";
import { productState } from "@/GlobalRedux/Slices/productSlice";
import Link from "next/link";
import { Typography } from "@mui/material";

const Products = () => {
  const { products, loading } = useSelector(productState);
  return (
    <div className="my-5 d-flex flex-wrap justify-content-between">
      {/* {loading ? (
        <Typography variant="subtitle1">Loading...</Typography>
      ) : products.length > 0 ? ( */}
      {products?.map((item, i) => {
        return (
          <Link
            style={{ textDecoration: "none", color: "transparent" }}
            key={i}
            href={{
              pathname: `product/${item.id}`,
              query: {
                id: item.id,
              },
            }}
          >
            <Item {...item} />
          </Link>
        );
      })}
      {/* ) : (
        <Typography variant="subtitle1">Sorry no products found...</Typography>
      )} */}
    </div>
  );
};

export default Products;
