import React, { Component } from "react";
import Slider from "react-slick";
import slide1 from "./images/slide1.jpg";
import slide2 from "./images/slide2.jpg";
import slide3 from "./images/slide3.jpg";

export default class AutoCarousel extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  play() {
    this.slider.slickPlay();
  }
  pause() {
    this.slider.slickPause();
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    return (
      <div className="mb-3">
        <Slider ref={(slider) => (this.slider = slider)} {...settings}>
          <div>
            <img style={{ width: "100%" }} src={slide1} alt="" />
          </div>
          <div>
            <img style={{ width: "100%" }} src={slide2} alt="" />
          </div>
          <div>
            <img style={{ width: "100%" }} src={slide3} alt="" />
          </div>
          <div>
            <img style={{ width: "100%" }} src={slide1} alt="" />
          </div>
          <div>
            <img style={{ width: "100%" }} src={slide2} alt="" />
          </div>
          <div>
            <img style={{ width: "100%" }} src={slide3} alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}
