import React, { useState, useEffect, useContext } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMessage, faGlobe } from "@fortawesome/free-solid-svg-icons";
import petifyContext from "../../context/petifyContextApi/petifyContext";
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
const { useNavigate } = require("react-router-dom");

function RescueDetail(props) {
  const location = useLocation();
  const { data } = location.state;
  let navigate = useNavigate();
  let context = useContext(petifyContext);

  const { status } = data;
  const [newStatus, setNewStatus] = useState("");

  const [viewport, setViewport] = React.useState({
    latitude: data.latitude,
    longitude: data.longitude,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    if (status === "Pending") {
      setNewStatus("In Process");
    } else if (status === "In Process") {
      setNewStatus("Completed");
    } else {
      setNewStatus("Completed");
    }

    setViewport({
      ...viewport,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  }, [status]);

  const handleApprove = async () => {
    const response = await fetch(
      `https://petify-shelter-server.vercel.app/api/rescue/updaterescue/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("shelter-token"),
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      context.setPopupValue({
        show: true,
        message: "Request Approved",
        type: "success",
      });
      console.log("Status Updated");
    } else {
      console.log("Status Not Updated");
    }
    navigate("/shelter/rescue-requests");
  };

  const handleReject = async () => {
    const response = await fetch(
      `https://petify-shelter-server.vercel.app/api/rescue/deleterescue/${data._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("shelter-token"),
        },
      }
    );

    const json = await response.json();
    console.log(json);
    if (json.success) {
      context.setPopupValue({
        show: true,
        message: "Request Rejected",
        type: "success",
      });
    }
    navigate("/shelter/rescue-requests");
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
                <FontAwesomeIcon
                  className="icon"
                  icon={faChevronCircleLeft}
                  style={{ color: "#4F3FCA" }}
                />{" "}
              </div>
            }
            nextArrow={
              <div className="nextArrow">
                <FontAwesomeIcon
                  className="icon"
                  icon={faChevronCircleRight}
                  style={{ color: "#4F3FCA" }}
                />{" "}
              </div>
            }
          >
            {data.images.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <div
                  className="gallery"
                  style={{
                    backgroundImage: `url(https://petify-shelter-server.vercel.app/uploads/images/${slideImage}) `,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>
        <div className="col-md-6 col-12">
          <div className="buttons_group mb-3 mx-2">
            <button className="btn btn-success mx-2" onClick={handleApprove}>
              <span>Approve</span>
            </button>
            <button className="btn btn-danger" onClick={handleReject}>
              <span>Reject</span>
            </button>
          </div>
          <div
            className="pet_description"
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <h5>Description</h5>
            <p>{data.description}</p>
          </div>
          <div className="col-md-12 col-12">
            <div className="contact_container">
              <div
                className="contact_Info"
                style={{ backgroundColor: "#FAFAFA" }}
              >
                <h5 className="mt-3">Contact Info</h5>
                <div
                  className="contact_details"
                  style={{
                    flexDirection: "column",
                    padding: "20px 0px",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  <div
                    className="message"
                    style={{
                      border: "2px solid #6c5ce7",
                      backgroundColor: "#FAFAFA",
                    }}
                  >
                    <span>{data.contactName}</span>
                  </div>

                  <div
                    className="phone_no"
                    style={{ backgroundColor: "#6c5ce7" }}
                  >
                    <FontAwesomeIcon className="icon mx-2" icon={faPhone} />
                    <span>{data.contactNumber}</span>
                  </div>
                </div>
              </div>
            </div>
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
                  style={{ height: 250, borderRadius: "10px", padding: "5px" }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                >
                  <Marker
                    longitude={data.longitude}
                    latitude={data.latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                    color="red"
                  />
                  <GeolocateControl
                    style={{ right: 10, top: 10 }}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                  />
                  <div style={{ position: "absolute", right: 10, top: 50 }}>
                    <NavigationControl />
                  </div>
                </MapGL>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RescueDetail;
