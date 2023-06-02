import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navItem.css";

export default function NavItem(props) {
  const itemStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "46px",
    textDecoration: "none",
    color: "#FDFDFD",
    fontSize: "1rem",
    transition: "all 0.3s",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const selectedStyle = {
    backgroundColor: props.activeColor,
    color: "#fff",
  };

  const handleClick = () => {
    props.setActiveItem(props.title);
  };

  return (
    <li
      className="nav-item"
      style={{
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        onClick={handleClick}
        to={props.link}
        style={
          props.activeItem === props.title
            ? { ...itemStyle, ...selectedStyle }
            : itemStyle
        }
      >
        <FontAwesomeIcon className="icon" icon={props.icon} />
        <span className="nav-item-title">{props.title}</span>
      </Link>
    </li>
  );
}
