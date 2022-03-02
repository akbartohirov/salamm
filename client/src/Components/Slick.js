import React from "react";
import Slider from "react-slick";

const Slick = ({ data, Card, numSlide }) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: numSlide,
    slidesToScroll: numSlide,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mb-3">
      <Slider {...settings}>
        {data.map((item, index) => (
          <Card
            key={index}
            data={item}
            index={index}
            ownstyle={{
              borderLeft: "10px solid #fff",
              borderRight: "10px solid #fff",
            }}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Slick;
