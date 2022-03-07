import React, { Component } from "react";
import Slider from "react-slick";

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

    const redirect = (e, slide) => {
      console.log(slide);
    };

    return (
      <div className="mb-3">
        <Slider ref={(slider) => (this.slider = slider)} {...settings}>
          {this.props.slides &&
            this.props.slides.map((slide, index) => (
              <div onClick={(e) => redirect(e, slide)} key={index}>
                <a href={`/products/${slide.link}`}>
                  <img
                    style={{ width: "100%" }}
                    src={`/${slide.path}`}
                    alt=""
                  />
                </a>
              </div>
            ))}
        </Slider>
      </div>
    );
  }
}
