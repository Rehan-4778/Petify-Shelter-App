import React, { useState, useEffect } from "react";
import "./sideNavbar.css";
import { Link } from "react-router-dom";
import NavItem from "../navItem/NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function SideNavbar(props) {
  const { navItems, activeColor, hoverColor } = props;

  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/shelter") {
      setActiveItem("Dashboard");
    } else if (window.location.pathname === "/shelter/dashboard") {
      setActiveItem("Dashboard");
    } else if (window.location.pathname === "/shelter/pets") {
      setActiveItem("Pets");
    } else if (window.location.pathname === "/shelter/rescue-requests") {
      setActiveItem("Rescue Requests");
    } else if (window.location.pathname === "/shelter/pet-ads") {
      setActiveItem("Pet Ads");
    } else if (window.location.pathname === "/shelter/adoption-list") {
      setActiveItem("Adoption List");
    } else if (window.location.pathname === "/admin") {
      setActiveItem("Dashboard");
    } else if (window.location.pathname === "/admin/dashboard") {
      setActiveItem("Dashboard");
    } else if (window.location.pathname === "/admin/shelters") {
      setActiveItem("Shelters");
    } else if (window.location.pathname === "/admin/add-shelter") {
      setActiveItem("Add Shelter");
    }
  }, [navItems, activeItem]);

  return (
    <>
      <div
        className="side-navbar"
        style={{
          background: "linear-gradient(180deg, #33383d 0%, #191919 100%)",
        }}
      >
        <div className="side-navbar__logo">
          <img src="/favicon2.png" alt="logo" />
        </div>
        <div className="side-navbar__menu">
          <ul>
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                title={item.title}
                link={item.link}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                activeColor={activeColor}
                hoverColor={hoverColor}
              />
            ))}
          </ul>
        </div>
        <div className="logout">
          <Link to="/logout" style={{ color: "#FDFDFD" }}>
            <FontAwesomeIcon className="icon" icon={faSignOut} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
}
