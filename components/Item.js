import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Item({ name, price, desc, images, quantity_available, category }) {
  return (
    <Box
      className="item-card"
      sx={{
        mb: 3,
        width: 270,
        objectFit: "cover",
        border: 1,
        "&:hover": {
          "& .quick-look": {
            display: "flex",
            bottom: 0,
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          height: 300,
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={images[0]}
          alt="product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Typography
          className="fw-light"
          variant="subtitle2"
          sx={{ position: "absolute", top: 15, left: 15 }}
        >
          NEW
        </Typography>
        <Box
          className="quick-look"
          sx={{
            position: "absolute",
            transition: "bottom 0.2s ease-in",
            bottom: -20,
            opacity: 0,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            bgcolor: "#0c0c0c",
          }}
        >
          <Typography
            className="text-white bg-dark py-1 px-2"
            variant="caption"
          >
            QUICK LOOK
          </Typography>
          <Typography
            sx={{
              bgcolor: "#5d5d5d",
              p: 0.7,
            }}
            variant="subtitle2"
          >
            <FavoriteIcon sx={{ fontSize: "17px", color: "#fff" }} />
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          py: 2.5,
        }}
      >
        <Typography variant="body1" className="text-uppercase">
          {name}
        </Typography>
        <Box className="add-to-cart d-flex justify-content-center">
          <Typography variant="caption" className="space cart">
            ADD TO CART
          </Typography>
          <Typography variant="caption" className="price">
            ${price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Item;
