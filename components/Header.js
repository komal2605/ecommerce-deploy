"use client";
import React from "react";
import { Box } from "@mui/material";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SlideContent from "./SlideContent";

const SlideData = [
  {
    image: [
      "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide1-img.png",
    ],
    position: "bottom",
    title: "Think Different",
    desc: "Depot is unique & captivating theme designed specifically for all types of shops and online stores.",
  },
  {
    image: [
      "https://depot.qodeinteractive.com/wp-content/uploads/2017/02/h1-slide2-img1.png",
      "https://depot.qodeinteractive.com/wp-content/uploads/2017/02/h1-slide2-img2.png",
    ],

    position: "top",
    title: "Premium Comfort",
    desc: "One-click import feature lets you import the complete Depot demo content with a single mouse click.",
  },
  {
    image: [
      "https://depot.qodeinteractive.com/wp-content/uploads/2017/02/h1-slide3-img.jpg",
    ],
    position: "bottom",
    height: "140%",
    title: "Contemporary Design",
    desc: " A large set of beautiful & fully flexible homepage layouts lets you create your website quickly & easily.",
  },
];

function Header() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        ' custom-pagination-bullet">' +
        "0" +
        (index + 1) +
        "</span>"
      );
    },
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Swiper
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 1500,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        spaceBetween={10}
        hashNavigation
        slidesPerView={1}
        pagination={pagination}
      >
        {SlideData.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <SlideContent {...item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default Header;
