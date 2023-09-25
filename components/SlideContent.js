"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

function SlideContent({ position, height, image, title, desc }) {
  return (
    <Box sx={{ bgcolor: "#F3F3F3", height: "calc(100vh - 170px)" }}>
      <Box className="w-100 mx-0 d-flex gap-5 w-100 h-100">
        <Box
          className=" d-flex flex-column justify-content-center gap-2 mt-auto"
          sx={{ width: "40%", mb: 5, p: "0 30px 45px 100px" }}
        >
          <Typography
            variant="h5"
            component="h5"
            className="text-uppercase fw-semibold"
          >
            {title}
          </Typography>
          <Typography variant="subtitle1" component="h5">
            {desc}
          </Typography>
        </Box>
        <Box
          className={`animated-image-container ${
            position === "top" ? "top" : ""
          }`}
          sx={{
            width: "55%",
            display: "flex",
            overflow: "hidden",
            pr: 10,
            position: "relative",
          }}
        >
          {image.map((img, index) => (
            <div
              className={`.img${index}`}
              key={index}
              style={{
                width: image.length > 1 ? "50%" : "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
                marginTop: index === 1 ? "-60px" : "0",
              }}
            >
              <img
                src={img}
                alt=".."
                className="animated-image"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: height ? height : "100%",
                  marginBottom: height ? -250 : 0,
                  position: "absolute",
                  [position]: "-100%",
                  transition: `${position} 0.5s ease-in-out`,
                }}
              />
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default SlideContent;
