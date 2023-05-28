import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import PetifyContext from "../../../context/petifyContextApi/petifyContext";
import Map from "../../../Components/Map/Map";
import TextInput from "../../../Components/inputFields/TextInputs";
import FullButton from "../../../Components/Buttons/FullButton";
import UploadImage from "../../../Components/UploadImages/UploadImage";

const Signup = (props) => {
  const context = useContext(PetifyContext);
  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(1);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    longitude: "",
    latitude: "",
    images: [],
    phone: "",
    description: "",
    website: "",
  });

  const [resetImages, setResetImages] = useState(false);
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(JSON.stringify(credentials));
  };

  const setLocationFromMap = (latitude, longitude) => {
    setCredentials({
      ...credentials,
      latitude: latitude,
      longitude: longitude,
    });
  };

  const ChangeImageFile = (files) => {
    for (let i = 0; i < files.length; i++) {
      credentials.images.push(files[i]);
    }
  };

  const handleCredSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/shelterAuth/checkshelter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
        }),
      }
    );
    const json = await response.json();

    if (json.success) {
      setModalShow(2);
    } else {
      context.setPopupValue({
        show: "true",
        message: "Email Already Exists",
        type: "danger",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.latitude === "" || credentials.longitude === "") {
      context.setPopupValue({
        show: true,
        message: "Please select location",
        type: "warning",
      });
    }

    if (!credentials.images.length) {
      context.setPopupValue({
        show: true,
        message: "Please select images",
        type: "warning",
      });
      return;
    }

    const mydata = new FormData();
    const filenames = [];
    for (let i = 0; i < credentials.images.length; i++) {
      const filename = credentials.images[i].name;
      filenames.push(filename);
      mydata.append("files", credentials.images[i], filename);
    }

    const response = await fetch("http://localhost:5000/api/image/upload", {
      method: "POST",
      body: mydata,
    });
    const data = await response.json();

    if (response.status === 200) {
      const imageNames = [];
      data.forEach((image) => {
        imageNames.push(image.filename);
      });
      const response2 = await fetch(
        "http://localhost:5000/api/shelterAuth/createshelter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...credentials, images: imageNames }),
        }
      );
      const json = await response2.json();
      if (json.success) {
        context.setPopupValue({
          show: true,
          message: "Shelter Created! Wait for admin Approval",
          type: "success",
        });
        navigate("/shelter/login");
      }
    }


  };

  return (
    <>
      <div className="shelter_login_container">
        {modalShow === 1 && (
          <div className="shelter_login_content ">
            <div className="shelter_form_logo">
              <h3>Petify</h3>
            </div>
            <div className="shelter_login_header">
              <h6>SIGN UP</h6>
            </div>
            <div className="shelter_login_form">
              <form onSubmit={handleCredSubmit}>
                <div className="form-group form_name">
                  <label htmlFor="name">Name</label>
                  <TextInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter shelter name"
                    value={credentials.name}
                    onChange={onChange}
                    minLength={5}
                    maxLength={30}
                    focusColor="#6c5ce7"
                  />
                </div>
                <div className="form_email mt-2">
                  <label htmlFor="email">Email address</label>
                  <TextInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={credentials.email}
                    onChange={onChange}
                    minLength={5}
                    focusColor="#6c5ce7"
                    ariaDescribedBy="emailHelp"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form_password mt-1">
                  <label htmlFor="password">Password</label>
                  <TextInput
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={onChange}
                    minLength={8}
                    maxLength={30}
                    focusColor="#6c5ce7"
                  />
                </div>

                <div className="submitBtn mt-3">
                  <FullButton
                    type="submit"
                    text="Proceed"
                    color="#6c5ce7"
                    textColor="#fff"
                    width="100%"
                    height="35px"
                    borderRadius="5px"
                    fontSize="15px"
                    fontWeight="500"
                    padding="0.3rem 0.6rem"
                  />
                </div>
              </form>
              <div className="shelter_login_footer">
                <div className="dividerLine">
                  <span className="span1"></span>
                  <span> OR </span>
                  <span className="span2"></span>
                </div>

                <div className="login_social">
                  <div className="social_icon">
                    <a href="/" className="social_link">
                      <FontAwesomeIcon
                        className="icon facebook"
                        icon={faFacebookF}
                      />
                    </a>

                    <a href="/" className="social_link">
                      <FontAwesomeIcon
                        className="icon twitter"
                        icon={faTwitter}
                      />
                    </a>

                    <a href="/" className="social_link">
                      <FontAwesomeIcon
                        className="icon google"
                        icon={faGoogle}
                      />
                    </a>
                  </div>
                </div>

                <p>
                  Already have an acoount?
                  <Link to="/shelter/login"> Login</Link>
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {
            // Modal 2
            modalShow === 2 && (
              <div className="info_content">
                <div className="backBtn">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faArrowCircleLeft}
                    onClick={() => setModalShow(1)}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group form_name mb-2">
                      <label htmlFor="address">Location</label>
                      <Map setLocationFromMap={setLocationFromMap} />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="col-md-12 mb-3">
                      <div className="form-group form_name">
                        <label htmlFor="description">Description</label>
                        <textarea
                          className="form-control"
                          name="description"
                          id="description"
                          onChange={(e) => onChange(e)}
                          value={credentials.description}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group form_name">
                        <label htmlFor="images">Images</label>
                        <UploadImage
                          ChangeImageFile={ChangeImageFile}
                          resetImages={resetImages}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group form_name mb-2">
                      <label htmlFor="phone">Phone No</label>
                      <TextInput
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter phone no"
                        value={credentials.phone}
                        onChange={onChange}
                        minLength={11}
                        maxLength={13}
                        focusColor="#6c5ce7"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group form_name mb-2">
                      <label htmlFor="address">Website</label>
                      <TextInput
                        type="text"
                        id="website"
                        name="website"
                        placeholder="Enter website url"
                        value={credentials.website}
                        onChange={onChange}
                        minLength={5}
                        maxLength={30}
                        focusColor="#6c5ce7"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="offset-md-4 col-md-4 col-12 submitBtn mt-3">
                    <FullButton
                      type="submit"
                      text="Submit"
                      color="#6c5ce7"
                      textColor="#fff"
                      width="100%"
                      height="35px"
                      borderRadius="5px"
                      fontSize="15px"
                      fontWeight="500"
                      padding="0.3rem 0.6rem"
                    />
                  </div>
                </div>
              </div>
            )
          }
        </form>
      </div>
    </>
  );
};

export default Signup;
