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
    title: "Contemporary Design.",
    desc: " A large set of beautiful & fully flexible homepage layouts lets you create your website quickly & easily.",
  },
];

function Header() {
  const [initialLoad, setInitialLoad] = React.useState(true);
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

  const handleSlideChange = (swiper) => {
    swiper.slides.forEach((slide, index) => {
      const imageContainer = slide.querySelector(".animated-image-container");
      if (imageContainer) {
        if (index === swiper.activeIndex) {
          imageContainer.classList.add("active");
        } else {
          imageContainer.classList.remove("active");
        }
      }
    });
  };

  React.useEffect(() => {
    if (initialLoad) {
      const firstSlideImageContainer = document.querySelector(
        ".swiper-slide-active .animated-image-container"
      );
      if (firstSlideImageContainer) {
        firstSlideImageContainer.classList.add("active");
      }
      setInitialLoad(false);
    }
  }, [initialLoad]);
  return (
    <Box sx={{ position: "relative" }}>
      <Swiper
        effect={"fade"}
        loop
        autoplay={{
          delay: 1000,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        spaceBetween={10}
        hashNavigation
        slidesPerView={1}
        pagination={pagination}
        onSlideChange={(e) => {
          handleSlideChange(e);
        }}
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
