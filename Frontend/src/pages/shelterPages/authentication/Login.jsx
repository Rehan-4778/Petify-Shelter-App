import React, { useState, useContext } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FullButton from "../../../Components/Buttons/FullButton";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import PetifyContext from "../../../context/petifyContextApi/petifyContext";
import TextInput from "../../../Components/inputFields/TextInputs";

const Login = (props) => {
  const context = useContext(PetifyContext);

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://petify-shelter-server.vercel.app/api/shelterAuth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email.toString(),
          password: credentials.password.toString(),
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("shelter-token", json.authtoken);
      // props.showAlert('Logged in Successfully', 'success');
      console.log("Logged in Successfully");
      context.setPopupValue({
        show: "true",
        message: "Logged in Successfully",
        type: "success",
      });

      navigate("/shelter/dashboard");
    } else {
      console.log("Invalid Credentials");
      context.setPopupValue({
        show: "true",
        message: "Invalid Credentials",
        type: "danger",
      });
    }
  };

  return (
    <>
      <div className="shelter_login_container">
        <div className="shelter_login_content">
          <div className="shelter_form_logo">
            <h3>Petify</h3>
          </div>
          <div className="shelter_login_header">
            <h6>LOGIN</h6>
          </div>
          <div className="shelter_login_form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form_email">
                  <label htmlFor="email">Email</label>
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
                </div>

                <div className="form_password">
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

                <div className="form_remember">
                  <label htmlFor="remember">Remember me?</label>
                  <input type="checkbox" name="remember" id="remember" />
                </div>

                <div className="submitBtn">
                  <FullButton
                    type="submit"
                    text="Sign In"
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

                <div className="form_forget">
                  <a href="/" className="forget">
                    Forgot Password?
                  </a>
                </div>
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
                    <FontAwesomeIcon className="icon google" icon={faGoogle} />
                  </a>
                </div>
              </div>

              <p>
                Don't have an account?
                <Link to="/shelter/signup"> Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
