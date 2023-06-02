import React, { useState, useContext } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import petifyContext from "../../../context/petifyContextApi/petifyContext";
import BASE_URL from "../../../config";

const Login = (props) => {
  const context = useContext(petifyContext);

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email.toString(),
        password: credentials.password.toString(),
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      // props.showAlert('Logged in Successfully', 'success');
      console.log("Logged in Successfully");
      context.setPopupValue({
        show: "true",
        message: "Logged in Successfully",
        type: "success",
      });

      navigate("/");
    } else {
      //  props.showAlert('Invalid Credentials', 'danger');
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
      <div className="login_container">
        <div className="login_content">
          <div className="form_logo">
            <h3>Petify</h3>
          </div>
          <div className="login_header">
            <h6>Welcome Back!</h6>
          </div>
          <div className="login_form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form_email">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={credentials.email}
                    onChange={onChange}
                  />
                </div>

                <div className="form_password">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>

                <div className="form_remember">
                  <label htmlFor="remember">Remember me?</label>
                  <input type="checkbox" name="remember" id="remember" />
                </div>

                <div className="submitBtn">
                  <button type="submit">Sign In</button>
                </div>

                {/* <div className="form_forget">
                  <a href="/" className="forget">
                    Forgot Password?
                  </a>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
