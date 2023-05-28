import React from "react";
import "./search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = (props) => {
  return (
    <div
      className="searchContainer"
      style={{
        backgroundColor: props.backgroundColor,
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
      }}
    >
      <FontAwesomeIcon
        className="icon"
        icon={props.icon}
        style={{
          color: props.iconColor,
          fontSize: props.iconSize,
          margin: props.iconMargin,
        }}
      />

      <input
        type="text"
        placeholder={props.placeholder}
        placeholderColor={props.placeholderColor}
        style={{
          width:'100%',
          backgroundColor: props.backgroundColor,
          color: props.color,
          fontSize: props.fontSize,
          padding: props.padding,
        }}
      />
    </div>
  );
};

export default Search;
