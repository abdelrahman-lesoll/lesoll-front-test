import { createRef } from "react";
import { NextArrow, PrevArrow } from "../../Shared/Arrows";

export const nextArrowRef = createRef();
export const prevArrowRef = createRef();

export const settings = (length) => {
  return {
    infinite: true,
    speed: 500,
    slidesToShow: length < 3 ? length : 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow ref={nextArrowRef} />,
    prevArrow: <PrevArrow ref={prevArrowRef} />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
};

export const Comparisons = [
  "UnitType",
  "Price",
  "Area",
  "DownPayment",
  "InstallmentPeriod",
  "InstallmentAmount",
  "Rooms",
  "BathRooms",
  "Negotiable",
  "Furnished",
];
