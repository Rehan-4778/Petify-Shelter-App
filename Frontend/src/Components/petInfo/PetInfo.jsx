import React from "react";
import "./petInfo.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMessage } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

export default function PetInfo(props) {
  const { _id } = props.state;
  const {
    name,
    description,
    breed,
    gender,
    color,
    images,
    price,
    longitude,
    latitude,
    contactName,
    contactNumber,
  } = props.state.data;

  //   console.log(props.state.data);

  return (
    <div className="infoContainer">
      <div className="img-slider row">
        <div className="slide-container col-md-6 col-12">
          <Slide
            autoplay={true}
            duration={3000}
            transitionDuration={1000}
            infinite={true}
            indicators={true}
            arrows={true}
            prevArrow={
              <div className="prevArrow">
                <FontAwesomeIcon className="icon" icon={faChevronCircleLeft} />{" "}
              </div>
            }
            nextArrow={
              <div className="nextArrow">
                <FontAwesomeIcon className="icon" icon={faChevronCircleRight} />{" "}
              </div>
            }
          >
            {images.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <div
                  className="gallery"
                  style={{
                    backgroundImage: `url("http://localhost:5000/uploads/images/${slideImage}")`,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>

        <div className="col-md-6 col-12">
          <div className="pet_description">
            <h5>Description</h5>
            <p>{description}</p>
          </div>

          <div className="contact_container">
            <div className="contact_Info">
              <div className="contact_header">
                <h3>PKR {price}</h3>
                <div className="tagline">
                  <span>Managed by Petify</span>
                </div>
              </div>

              <div className="contact_details">
                <div className="phone_no">
                  <FontAwesomeIcon className="icon mx-2" icon={faPhone} />
                  <span>{contactNumber}</span>
                </div>

                <div className="message">
                  <FontAwesomeIcon className="icon mx-2" icon={faMessage} />
                  <span>Send Message</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pet-details">
        <h3>Pet Detail</h3>

        <div className="boxes">
          <div className="box">
            <h6>Name</h6>
            <p>{name}</p>
          </div>

          <div className="box">
            <h6>Gender</h6>
            <p>XYZ</p>
          </div>

          <div className="box">
            <h6>Breed</h6>
            <p>{breed}</p>
          </div>

          <div className="box">
            <h6>Color</h6>
            <p>{color}</p>
          </div>

          <div className="box">
            <h6>Price</h6>
            <p>{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
