"use client";
import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";
import { productState } from "@/app/GlobalRedux/Slices/productSlice";
import Link from "next/link";

const Products = () => {
  const { DummyData } = useSelector(productState);
  return (
    <div className="my-5 d-flex flex-wrap justify-content-between">
      {DummyData?.map((item, i) => {
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
    </div>
  );
};

export default Products;
