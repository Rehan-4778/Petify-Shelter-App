import React, { useState, useContext, useEffect } from "react";
import "./rescueForm.css";
import PetifyContext from "../../context/petifyContextApi/petifyContext";
import Map from "../Map/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "../UploadImages/UploadImage";

export default function RescueForm() {
  const context = useContext(PetifyContext);
  const [RescueData, setRescueData] = useState({
    description: "",
    contactName: "",
    contactNumber: "",
    images: [],
    latitude: null,
    longitude: null,
  });

  const [button, setButton] = useState({
    currentLocation: false,
    chooseLocation: false,
  });

  const [resetImages, setResetImages] = useState(false);

  const ChangeImageFile = (files) => {
    for (let i = 0; i < files.length; i++) {
      RescueData.images.push(files[i]);
    }
  };

  const setLocationFromMap = (latitude, longitude) => {
    setRescueData({ ...RescueData, latitude: latitude, longitude: longitude });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setRescueData({
        ...RescueData,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  const handleOnChange = (e) => {
    setRescueData({ ...RescueData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (RescueData.latitude === null || RescueData.longitude === null) {
      context.setPopupValue({
        show: true,
        message: "Please select location",
        type: "danger",
      });
      return;
    }

    if (!RescueData.images.length) {
      context.setPopupValue({
        show: true,
        message: "Please select pictures",
        type: "danger",
      });
      return;
    }

    const mydata = new FormData();
    const filenames = [];
    for (let i = 0; i < RescueData.images.length; i++) {
      const filename = RescueData.images[i].name;
      filenames.push(filename);
      mydata.append("files", RescueData.images[i], filename);
    }

    /// Upload images to server
    const response = await fetch(
      "https://petify-shelter-server.vercel.app/api/image/upload",
      {
        method: "POST",
        body: mydata,
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      const imageNames = [];
      data.forEach((image) => {
        imageNames.push(image.filename);
      });

      const response2 = await fetch(
        "https://petify-shelter-server.vercel.app/api/rescue/createrescue",
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...RescueData, images: imageNames }),
        }
      );

      const data2 = await response2.json();

      if (response2.status) {
        context.setPopupValue({
          show: true,
          message: "Rescue request has been submitted",
          type: "success",
        });
        // reset form
        setRescueData({
          description: "",
          contactName: "",
          contactNumber: "",
          images: [],
          latitude: null,
          longitude: null,
        });
        // // reset map
        setButton({
          currentLocation: false,
          chooseLocation: false,
        });
        // reset image
        setResetImages(!resetImages);
      } else {
        context.setPopupValue({
          show: true,
          message: data2.message,
          type: "danger",
        });
      }
    }
  };

  return (
    <>
      <div className="form_container">
        <form onSubmit={handleOnSubmit}>
          <div className="form_title">Pet Information</div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="images">Upload Pictures</label>
            </div>
            <div className="form_file">
              <UploadImage
                ChangeImageFile={ChangeImageFile}
                resetImages={resetImages}
              />
              <small id="imageHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Atleast 1 picture is
                required.
              </small>
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="location">Location</label>
            </div>

            <div className="form_input">
              <button
                id="location"
                type="button" // Change the button type to "button"
                className="location_button current"
                onClick={() => {
                  setButton({
                    currentLocation: true,
                    chooseLocation: false,
                  });
                  getCurrentLocation();
                }}
                style={{
                  backgroundColor: button.currentLocation ? "#6d2480" : "",
                }}
              >
                <FontAwesomeIcon className="icon" icon={faLocationCrosshairs} />
                <span>Current Location</span>
              </button>

              <button
                className="location_button choose"
                type="button" // Change the button type to "button"
                onClick={() => {
                  setButton({
                    currentLocation: false,
                    chooseLocation: true,
                  });
                  getCurrentLocation();
                  context.setPopupValue({
                    show: true,
                    message: "Click on the map to select location",
                    type: "warning",
                  });
                }}
                style={{
                  backgroundColor: button.chooseLocation ? "#6d2480" : "",
                }}
              >
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
                <span>Choose Location</span>
              </button>
              <div className="map mt-1">
                {button.chooseLocation && (
                  <Map setLocationFromMap={setLocationFromMap} />
                )}
              </div>

              <small id="locationHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Location is required.{" "}
                {RescueData.latitude} {RescueData.longitude}
              </small>
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="description">Description</label>
            </div>
            <div className="form_input">
              <textarea
                name="description"
                id="description"
                cols="40"
                rows="8"
                value={RescueData.description}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              ></textarea>
            </div>
          </div>

          <div className="divide"></div>

          <div className="form_title">Contact Information</div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="contactName">Name</label>
            </div>
            <div className="form_input">
              <input
                type="text"
                name="contactName"
                id="contactName"
                aria-describedby="contactHelp"
                required
                value={RescueData.contactName}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />

              <small id="contactHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Contact Name is required.
              </small>
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="contactNumber">Mobile Number</label>
            </div>
            <div className="form_input">
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                aria-describedby="contactNumberHelp"
                required
                minLength={11}
                maxLength={13}
                value={RescueData.contactNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              <small id="contactNumberHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Mobile Number is
                required.
              </small>
            </div>
          </div>

          <div className="form_group">
            <div className="form_button">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
