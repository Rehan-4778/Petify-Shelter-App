import React, { useState, useContext } from "react";
import "./adPost.css";
import UploadImage from "../../Components/UploadImages/UploadImage";
import Map from "../../Components/Map/Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PetifyContext from "../../context/petifyContextApi/petifyContext";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function AdPost(props) {
  const context = useContext(PetifyContext);

  const [postData, setPostData] = useState({
    name: "",
    description: "",
    gender: "",
    color: "",
    images: [],
    price: "",
    breed: "",
    contactName: "",
    contactNumber: "",
    longitude: null,
    latitude: null,
  });

  const [button, setButton] = useState({
    currentLocation: false,
    chooseLocation: false,
  });

  const [resetImages, setResetImages] = useState(false);

  const ChangeImageFile = (files) => {
    for (let i = 0; i < files.length; i++) {
      postData.images.push(files[i]);
    }
  };

  const handlePostData = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const setLocationFromMap = (latitude, longitude) => {
    setPostData({ ...postData, latitude: latitude, longitude: longitude });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPostData({
        ...postData,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const breed = document.querySelector(".breed");

    if (breed.textContent === "Select Pet Breed") {
      context.setPopupValue({
        show: true,
        message: "Please select a breed",
        type: "warning",
      });
      return;
    }

    if (postData.length > 200 || postData.length < 5) {
      context.setPopupValue({
        show: true,
        message: " Description should be between 5 to 200 characters.",
        type: "warning",
      });
      return;
    }

    if (postData.images.length < 1) {
      context.setPopupValue({
        show: true,
        message: "Please upload atleast 1 picture",
        type: "warning",
      });
      return;
    }

    if (postData.latitude === null || postData.longitude === null) {
      context.setPopupValue({
        show: true,
        message: "Please select location",
        type: "warning",
      });

      return;
    }

    const mydata = new FormData();
    for (let i = 0; i < postData.images.length; i++) {
      const filename = postData.images[i].name;
      mydata.append("files", postData.images[i], filename);
    }

    // Upload Images
    const response = await fetch(
      // "https://petify-shelter-server.vercel.app/api/image/upload",
      "http://localhost:5000/api/image/upload",
      {
        method: "POST",
        body: mydata,
      }
    );

    const json = await response.json();

    if (response.status === 200) {
      const imageNames = [];
      json.forEach((image) => {
        imageNames.push(image);
      });

      // Post Ad
      const response2 = await fetch(
        "https://petify-shelter-server.vercel.app/api/petAd/createad",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ ...postData, images: imageNames }),
        }
      );

      const json2 = await response2.json();
      console.log(json2);

      if (response2.status) {
        context.setPopupValue({
          show: true,
          message: "Post created successfully",
          type: "success",
        });

        // reset form
        setPostData({
          name: "",
          description: "",
          gender: "",
          color: "",
          price: "",
          breed: "",
          contactName: "",
          contactNumber: "",
          images: [],
          longitude: null,
          latitude: null,
        });
        setResetImages(true);
        breed.textContent = "Select Pet Breed";
        setButton({ currentLocation: false, chooseLocation: false });
      } else {
        context.setPopupValue({
          show: true,
          message: "Something went wrong",
          type: "danger",
        });
      }
    }
  };

  const handleSelectMenu = () => {
    const selectList = document.querySelector(".select-list");
    const iconUp = document.querySelector("#upIcon");
    const iconDown = document.querySelector("#downIcon");
    selectList.classList.toggle("active");
    iconUp.classList.toggle("active");
    iconDown.classList.toggle("active");
  };

  const handleSelectList = (e) => {
    const selectList = document.querySelector(".select-list");
    const iconUp = document.querySelector("#upIcon");
    const iconDown = document.querySelector("#downIcon");
    const breed = document.querySelector(".breed");
    breed.textContent = e.target.textContent;
    breed.value = e.target.textContent;
    selectList.classList.toggle("active");
    iconUp.classList.toggle("active");
    iconDown.classList.toggle("active");

    setPostData({ ...postData, breed: e.target.textContent });
  };

  return (
    <>
      <div className="form_container">
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className="form_title">Pet Information</div>
          <div className="form_group">
            <div className="form_label">
              <label htmlFor="name">Name</label>
            </div>
            <div className="form_input">
              <input
                name="name"
                id="name"
                type="text"
                placeholder="Enter Pet Name"
                aria-describedby="nameHelp"
                required
                value={postData.name}
                onChange={(e) => {
                  handlePostData(e);
                }}
              />

              <small id="nameHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Name is required.
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
                aria-describedby="descriptionHelp"
                required
                value={postData.description}
                onChange={(e) => {
                  handlePostData(e);
                }}
              ></textarea>
              <small id="descriptionHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Description should be
                between 5 to 200 characters.
              </small>
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label>Gender</label>
            </div>
            <div className="form_radio">
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="male"
                checked={postData.gender == "male" ? true : false}
                onChange={(e) => {
                  handlePostData(e);
                }}
                value="male"
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                id="female"
                checked={postData.gender == "female" ? true : false}
                onChange={(e) => {
                  handlePostData(e);
                }}
                value="female"
              />
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="color">Color</label>
            </div>
            <div className="form_input">
              <input
                type="text"
                name="color"
                id="color"
                value={postData.color}
                onChange={(e) => {
                  handlePostData(e);
                }}
              />
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="breed">Select Breed</label>
            </div>
            <div className="form_select">
              <span onClick={handleSelectMenu}>
                <span className="breed" value="" required>
                  Select Pet Breed
                </span>
                <FontAwesomeIcon
                  id="upIcon"
                  className="icon active"
                  icon={faChevronUp}
                />
                <FontAwesomeIcon
                  id="downIcon"
                  className="icon"
                  icon={faChevronDown}
                />
              </span>

              <small id="breedHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Breed is required.
              </small>

              <div className="select-list" onClick={(e) => handleSelectList(e)}>
                <div className="list-item">German Shepard</div>
                <div className="list-item">Poodle</div>
                <div className="list-item">Alaskan Malamute</div>
                <div className="list-item">Siberian Husky</div>
                <div className="list-item">Airedale</div>
              </div>
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="pictures">Upload Pictures</label>
            </div>
            <div className="form_file">
              <UploadImage
                ChangeImageFile={ChangeImageFile}
                resetImages={resetImages}
              />

              <small id="pictureHelp" className="form-text text-muted">
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
                type="button"
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
                <span className="text-danger">*</span> Location is required.
              </small>
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="price">Price</label>
            </div>
            <div className="form_input">
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Rupees"
                aria-describedby="priceHelp"
                required
                value={postData.price}
                onChange={(e) => {
                  handlePostData(e);
                }}
              />

              <small id="priceHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Price is required.
              </small>
            </div>
          </div>

          <div className="divide"></div>

          <div className="form_title">Contact Information</div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="contactName">Contact Name</label>
            </div>
            <div className="form_input">
              <input
                type="text"
                name="contactName"
                id="contactName"
                aria-describedby="contactHelp"
                required
                value={postData.contactName}
                onChange={(e) => {
                  handlePostData(e);
                }}
              />

              <small id="contactHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Contact Name is required.
              </small>
            </div>
          </div>

          <div className="form_group">
            <div className="form_label">
              <label htmlFor="contactNumber">Contact Number</label>
            </div>
            <div className="form_input">
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                aria-describedby="contactHelp"
                required
                value={postData.contactNumber}
                onChange={(e) => {
                  handlePostData(e);
                }}
              />

              <small id="contactHelp" className="form-text text-muted">
                <span className="text-danger">*</span> Contact Number is
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
