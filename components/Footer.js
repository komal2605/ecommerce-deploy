import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import React from "react";

const SlideText = ({ children }) => {
  return (
    <Typography variant="subtitle2" className="footer-links d-flex">
      <span>
        <ArrowForwardIcon sx={{ fontSize: "18px", mr: 1 }} />
      </span>
      {children}
    </Typography>
  );
};

function Footer() {
  return (
    <Box
      className="pt-5 pb-3"
      sx={{
        px: 10,
      }}
    >
      <Box className="row mx-0 py-5">
        <Box className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column gap-1">
          <Typography variant="body1" className="upperCase space mb-3">
            customer service
          </Typography>
          <SlideText variant="subtitle2" className="footer-links d-flex">
            Help & contact Us
          </SlideText>
          <SlideText variant="subtitle2">Returns & Refunds</SlideText>
          <SlideText variant="subtitle2">Online Stores</SlideText>
          <SlideText variant="subtitle2">Terms & Conditions</SlideText>
        </Box>
        <Box className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column gap-1">
          <Typography variant="body1" className="upperCase space mb-3">
            company
          </Typography>
          <SlideText variant="subtitle2">What we do</SlideText>
          <SlideText variant="subtitle2">Available Services</SlideText>
          <SlideText variant="subtitle2">Latest Posts</SlideText>
          <SlideText variant="subtitle2">FAQs</SlideText>
        </Box>
        <Box className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column gap-1">
          <Typography variant="body1" className="upperCase space mb-3">
            social media
          </Typography>
          <SlideText variant="subtitle2">Twitter</SlideText>
          <SlideText variant="subtitle2">Instagram</SlideText>
          <SlideText variant="subtitle2">Tumbir</SlideText>
          <SlideText variant="subtitle2">Pinterest</SlideText>
        </Box>
        <Box className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column gap-1">
          <Typography variant="body1" className="upperCase space mb-3">
            profile
          </Typography>
          <SlideText variant="subtitle2">My Account</SlideText>
          <SlideText variant="subtitle2">Checkout</SlideText>
          <SlideText variant="subtitle2">Order Tracking</SlideText>
          <SlideText variant="subtitle2">Help & Support</SlideText>
        </Box>
      </Box>
      <Divider sx={{ mt: 7, mb: 2 }} />
      <Box className="d-flex justify-content-between">
        <Typography variant="caption">
          © {new Date().getFullYear()} Komal, All Rights Reserved
        </Typography>
        <Box className="d-flex gap-3 align-items-center">
          <Typography variant="caption" sx={{ color: "#000" }}>
            Follow us
          </Typography>
          <TwitterIcon sx={{ fontSize: "15px" }} />
          <InstagramIcon sx={{ fontSize: "15px" }} />
          <FacebookIcon sx={{ fontSize: "15px" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
