import { forwardRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export const NextArrow = forwardRef((props, ref) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center cursor-pointer arrow-left bg-white d-none"
      onClick={props.onClick}
      ref={ref}
    >
      <BsArrowLeft />
    </div>
  );
});

export const PrevArrow = forwardRef((props, ref) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center cursor-pointer arrow-right bg-white d-none"
      onClick={props.onClick}
      ref={ref}
    >
      <BsArrowRight />
    </div>
  );
});
