import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import("./styling/Home.css");
// import { PromiseProvider } from "mongoose";

const Home = props => {
  //console.log(props.user.siteLanguage);
  if (props.currentLanguage === "English") {
    return (
      <div className="homeContainer">
        <img className="coverImage" src="/Cover.jpeg" alt="" />
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/public/images/"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="textContainer">
          <h1>Hello</h1>
          <p>
            We are a non-profit organisation that provides a platform and a
            space for locals in Berlin and recent refugees to help each other on
            non-profit basis, share skills and connect.
          </p>
          <Link className="getInvolved" to="/signup">
            Get involved
          </Link>
        </div>
      </div>
    );
  } else if (props.currentLanguage === "German") {
    return (
      <div>
        <h1>Hallo</h1>
        <p>Auf Deutch</p>
        <Link to="/signup">Get involved</Link>
      </div>
    );
  }
};

export default Home;
