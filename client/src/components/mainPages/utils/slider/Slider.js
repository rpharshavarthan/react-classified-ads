import React, { useEffect, useState } from "react";

export default function ImageSlider({ SliderData }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const lastIndex = SliderData.length - 1;
    if(current < 0){
      setCurrent(lastIndex)
    }
    if(current > lastIndex){
      setCurrent(0)
    }
  }, [current, SliderData])

  return (
    <div className="slider-body">
      {SliderData.map((slider, sliderIndex) => {
        const { image, id } = slider;
        let position = "nextSlide";
        if (sliderIndex === current) {
          position = "activeSlide";
        }
        if (
          sliderIndex === current - 1 ||
          (current === 0 && sliderIndex === SliderData.length - 1)
        ) {
          position = "lastSlide";
        }
        return (
          <div id="slider" className={`${position} slider`} key={id}>
            <img src={image} alt="slider image" />
          </div>
        );
      })}
      <div className="left" onClick={() => setCurrent(current-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      </div>
      <div className="right" onClick={() => setCurrent(current+1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
        </svg>
      </div>
    </div>
  );
}
