import React from "react";

function FullButton(props) {
  const buttonStyle = {
    backgroundColor: props.color,
    color: props.textColor,
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
    border: "none",
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    cursor: "pointer",
    padding: props.padding,
  };
  return (
    <div>
      <button
        type={props.type}
        style={buttonStyle}
        onClick={props.handleClick}
      >
        {props.text}
      </button>
    </div>
  );
}

export default FullButton;
