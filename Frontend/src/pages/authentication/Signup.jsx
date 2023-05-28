import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import PetifyContext from "../../context/petifyContextApi/petifyContext";

const Signup = (props) => {
  const context = useContext(PetifyContext);

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(
      `https://petify-shelter-server.vercel.app/api/auth/createuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.toString(),
          email: email.toString(),
          type: "user".toString(),
          password: password.toString(),
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect to login
      context.setPopupValue({
        show: "true",
        message: "Account Created Successfully",
        type: "success",
      });

      navigate("/login");
    } else {
      console.log("Invalid Credential");
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
            <h6>SIGN UP</h6>
          </div>
          <div className="login_form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  aria-describedby="emailHelp"
                  placeholder="Enter username"
                  value={credentials.name}
                  onChange={onChange}
                />
              </div>
              <div className="form_email mt-2">
                <label htmlFor="email">Email address</label>
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
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form_password mt-1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={onChange}
                  minLength={5}
                  required
                />
              </div>

              <div className="submitBtn mt-3">
                <button type="submit">Sign Up</button>
              </div>
            </form>
            <div className="login_footer">
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
                Already have an acoount?
                <Link to="/login"> Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
