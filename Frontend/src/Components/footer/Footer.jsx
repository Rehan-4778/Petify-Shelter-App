import React, { useState, useContext } from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
import PetifyContext from "../../context/petifyContextApi/petifyContext";

export default function Footer() {
  const context = useContext(PetifyContext);

  const handleNewsLetterSubscription = (e) => {
    e.preventDefault();

    const email = e.target.children[0].value;

    if (email === "") {
      context.setPopupValue({
        show: "true",
        message: "Please enter your email",
        type: "danger",
      });
    } else if (!email.includes("@")) {
      context.setPopupValue({
        show: "true",
        message: "Please enter a valid email",
        type: "danger",
      });
    } else {
      context.setPopupValue({
        show: "true",
        message:
          "Congrats! 🎉 You have successfully subscribed to our newsletter",
        type: "success",
      });
    }
  };

  return (
    <div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="footer-col">
                <h6>Pages</h6>
                <a href="/">Home</a>
                <a href="/">Shelters</a>
                <a href="/">Adopt Pets</a>
                <a href="/">Rescue Pet</a>
                <a href="/">About Us</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="footer-col">
                <h6>Pets by Breed</h6>
                <a href="/">German Shepherd</a>
                <a href="/">Labrador Retriever</a>
                <a href="/">Golden Retriever</a>
                <a href="/">Bulldog</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="footer-col">
                <h6>Follow Us</h6>
                <div className="social">
                  <a href="/">
                    <FontAwesomeIcon className="icon" icon={faFacebookF} />
                  </a>
                  <a href="/">
                    <FontAwesomeIcon className="icon" icon={faTwitter} />
                  </a>
                  <a href="/">
                    <FontAwesomeIcon className="icon" icon={faInstagram} />
                  </a>
                  <a href="/">
                    <FontAwesomeIcon className="icon" icon={faLinkedinIn} />
                  </a>
                  <a href="/">
                    <FontAwesomeIcon className="icon" icon={faGooglePlus} />
                  </a>
                </div>

                <div className="newsLetter">
                  <h6>Subscribe to our Newsletter</h6>
                  <div className="subscribe">
                    <form action="/" onSubmit={handleNewsLetterSubscription}>
                      <input type="text" placeholder="Enter your email" />
                      <button type="submit" className="subBtn">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="footer-bottom">
                <p>© 2022 Petify - Shelter App. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
