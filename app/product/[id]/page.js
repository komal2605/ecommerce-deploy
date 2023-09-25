"use client";
import React from "react";
import Image from "next/image";
import { Box, Button, Input, Rating, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { productState } from "@/app/GlobalRedux/Slices/productSlice";
import { addToCart } from "@/app/GlobalRedux/Slices/productSlice";

function page() {
  const { DummyData, productList } = useSelector(productState);
  const [data, setData] = React.useState(null);
  // const [quantity, setQuantity] = React.useState(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const searchId = searchParams.get("id");

  const handleAddToCart = () => {
    const item = { ...data };
    dispatch(addToCart(item));
    alert("item added to cart !");
  };
  // React.useEffect(() => {
  //   const newItem = productList?.find((item) => item.id == data.id);
  //   if (newItem) {
  //     setQuantity(newItem.quantity_available);
  //   }
  // }, [productList]);

  React.useEffect(() => {
    const item = DummyData.find((item) => item.id == searchId);
    setData(item);
  }, [searchId, DummyData]);

  return (
    <Box
      sx={{
        mt: 14,
        p: 10,
        bgcolor: "#fafafa",
        "& img": {
          maxWidth: "100%",
        },
      }}
    >
      {data ? (
        <Box className="row gap-3 gap-md-0 mx-0">
          <Box
            className="col-12 col-md-6 d-flex justify-content-center gap-2"
            sx={{ flexDirection: { xs: "column", md: "row-reverse" } }}
          >
            <Box className="product-main-picture">
              <Image
                alt="product"
                src={data.images[0]}
                width={400}
                height={450}
              />
            </Box>
            <Box
              className="product-pictures d-flex gap-1"
              sx={{ flexDirection: { xs: "row", md: "column" } }}
            >
              <Image
                alt="product"
                src={data.images[0]}
                width={100}
                height={100}
              />
              <Image
                alt="product"
                src={data.images[0]}
                width={100}
                height={100}
              />
              <Image
                alt="product"
                src={data.images[0]}
                width={100}
                height={100}
              />
              <Image
                alt="product"
                src={data.images[0]}
                width={100}
                height={100}
              />
            </Box>
          </Box>
          <Box className="col-12 col-md-6">
            <Typography variant="h5" className="fw-bold">
              {data.name}
            </Typography>
            <Typography variant="h5" className="fw-light mb-5">
              ${data.price}
            </Typography>
            <Box className="d-flex gap-2 align-items-center mb-4">
              <Rating name="read-only" value={5} readOnly />
              <Typography variant="caption" className="upperCase">
                (1 customer review)
              </Typography>
            </Box>

            <Typography variant="subtitle2" className="mb-4">
              {data.desc}
            </Typography>

            <Box sx={{ display: "flex", mb: 3 }}>
              {/* <Box
                className="d-flex justify-content-center align-items-center gap-4 px-3"
                sx={{ border: 1, p: 2 }}
              >
                <Typography variant="subtitle2" className="me-5">
                  Quantity
                </Typography>
                <input
                  defaultValue={
                    data.quantity_available ? data.quantity_available : 1
                  }
                  type="number"
                  style={{
                    textAlign: "right",
                    width: 50,
                    border: "0 !important",
                  }}
                />
              </Box> */}
              <Button
                className="bg-dark text-white px-5 rounded-0"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>

            <Button
              className="bg-transparent text-dark ps-0 px-5 rounded-0 mb-4"
              startIcon={<FavoriteBorderIcon />}
            >
              Add to Cart
            </Button>

            <Typography variant="subtitle2">
              SKU: 008 <br />
              Categories: Decoration, Home Decor <br />
              Tags: Black, Modern
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography variant="caption">Loading...</Typography>
      )}
    </Box>
  );
}

export default page;
