import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Slider1 from "./../../img/slider1.png";

export default function SliderHome() {
  return (
    <div>
      {/* <Carousel style={{ marginTop: "66px", display: "flex" }}> */}

      <img
        className="Slide-img"
        src="https://greenwich.edu.vn/wp-content/uploads/2022/10/Welcome-1.jpg"
        alt="First slide"
      />
      {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}

      {/* 
        <Carousel.Item interval={1000}>
          <img className="Slide-img" src={Slider1} alt="First slide" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={1000}>
          <img
            className="Slide-img"
            src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption> */}
      {/* </Carousel.Item> */}
      {/* </Carousel> */}
    </div>
  );
}
