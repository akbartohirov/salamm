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
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
