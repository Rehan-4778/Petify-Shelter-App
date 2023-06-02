import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMessage, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import BASE_URL from "../../config";

function Details() {
  const location = useLocation();
  const { data } = location.state;

  const [viewport, setViewport] = React.useState({
    latitude: data.latitude,
    longitude: data.longitude,
    zoom: 8,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    setViewport({
      ...viewport,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  }, []);

  const handleApprove = async () => {
    const response = await fetch(
      `${BASE_URL}/api/shelterAuth/updateshelter/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("Shelter Approved");
    } else {
      console.log("Shelter Not Approved");
    }
  };

  const handleReject = async () => {
    const response = await fetch(
      `${BASE_URL}/api/shelterAuth/deleteshelter/${data._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      console.log("Shelter Rejected");
    } else {
      console.log("Shelter Not Rejected");
      console.log("Shelter Not Approved");
    }
  };

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
            {data.images.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <div
                  className="gallery"
                  style={{ backgroundImage: `url(${slideImage}) ` }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>
        <div className="col-md-6 col-12">
          <div className="buttons_group mb-3 mx-2">
            <button className="btn btn-primary mx-2" onClick={handleApprove}>
              <span>Approve</span>
            </button>
            <button className="btn btn-danger" onClick={handleReject}>
              <span>Reject</span>
            </button>
          </div>

          {data.name ? (
            <div className="pet_description mb-3">
              <h5>Name</h5>
              <p>{data.name}</p>
            </div>
          ) : null}

          <div className="pet_description">
            <h5>Description</h5>
            <p>{data.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            {data.latitude && data.longitude ? (
              <div className="map_container">
                <MapGL
                  mapboxAccessToken="pk.eyJ1IjoicmVoYW40Nzc4IiwiYSI6ImNsaGp4emk0djBtamIzbG54b3lwOXJ3ZWEifQ.mjIQF_n-h5-uBP0E4F3aBQ"
                  width="100%"
                  height="250px"
                  initialViewState={viewport}
                  onViewportChange={(viewport) => setViewport(viewport)}
                  style={{ height: 250, borderRadius: "5px", padding: "5px" }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                  <Marker
                    longitude={data.longitude}
                    latitude={data.latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                    color="red"
                  />
                </MapGL>
              </div>
            ) : null}
          </div>
          <div className="col-md-6 col-12">
            <div className="contact_container">
              <div className="contact_Info">
                <h5 className="mt-3">Contact Info</h5>
                <div
                  className="contact_details"
                  style={{ flexDirection: "column", padding: "20px 0px" }}
                >
                  <div
                    className="phone_no"
                    style={{ backgroundColor: "#6c5ce7" }}
                  >
                    <FontAwesomeIcon className="icon mx-2" icon={faPhone} />
                    <span>{data.phone}</span>
                  </div>

                  <div
                    className="message"
                    style={{ backgroundColor: "F1F1F1" }}
                  >
                    <FontAwesomeIcon className="icon mx-2" icon={faGlobe} />
                    <span>{data.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
