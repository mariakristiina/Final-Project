import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import("./styling/Home.css");
// import { PromiseProvider } from "mongoose";

const Home = props => {
  //console.log(props.user.siteLanguage);

  if (props.currentLanguage === "English") {
    return (
      <div>
        <div className="homeContainer">

          <Carousel>
            <Carousel.Item>
              <img
                className="d-block"
                src="/kidandmomCutt.jpg"
                alt="First slide"
              />
              {/*<Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>*/}
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block "
                src="/schoolCut.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block "
                src="/weAll.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="textContainer">
          <p>
            We are a non-profit organisation that provides a platform and a
            space for locals in Berlin and recent refugees to help each other on
            non-profit basis, share skills and connect.
          </p>
          <Link className="button" to="/signup"
          >Get involved</Link>
        </div>
      </div>
    )
  }
  else if (props.currentLanguage === "German") {
    return (
      <div>
        <div className="homeContainer">

          <Carousel>
            <Carousel.Item>
              <img
                className="d-block"
                src="/kidandmomCutt.jpg"
                alt="First slide"
              />
              {/*<Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>*/}
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block "
                src="/schoolCut.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block "
                src="/weAll.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="textContainer">
          <p>
            Diese Seite dient als Plattform für Geflüchtete und Einheimische, um sich untereinander zu helfen, Fähigkeiten zu teilen und sich zu vernetzen. Als gemeinnützige Organisation stellen wir nicht nur diese Plattform sondern auch unser Café im Herzen Berlins bereit als Treffpunkt und für Veranstaltungen.
            </p>
          <Link className="button" to="/signup"
          >Werde ein Teil</Link>
        </div>
      </div>
    )
  }
};


export default Home;
