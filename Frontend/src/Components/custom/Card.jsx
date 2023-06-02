import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./card.css";

const Card = (props) => {
  return (
    <div
      className="Dashboard__Card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1rem",
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        boxShadow: props.boxShadow,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1.2rem",
        }}
      >
        <FontAwesomeIcon
          style={{
            zIndex: 10,
          }}
          icon={props.icon}
          color={props.iconColor}
          size={props.iconSize}
        />
      </div>

      <div
        className="card_text"
        style={{
          position: "absolute",
          right: "1rem",
          top: "1rem",
          textAlign: "right",
        }}
      >
        <span
          style={{
            fontSize: ".9rem",
            color: props.titleColor,
            fontWeight: 300,
          }}
        >
          {props.title}
        </span>
        <h3 style={{ color: props.valueColor, fontWeight: "600" }}>
          {props.value}
        </h3>
      </div>
      <div
        className="card_footer"
        style={{
          position: "absolute",
          left: 0,
          bottom: "0",
          width: "100%",
          height: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="divider"
          style={{
            width: "80%",
            height: "2px",
            backgroundColor: "#eaeaea",
            borderRadius: "100%",
            marginTop: "0.2rem",
          }}
        ></div>
        <div
          style={{
            width: "85%",
            marginTop: "0.6rem",
            fontSize: ".9rem",
          }}
        >
          <span
            style={
              props.percentage[0] === "+"
                ? { color: "green", fontWeight: "600", letterSpacing: "0.06rem" }
                : { color: "red", fontWeight: "600", letterSpacing: "0.06rem" }
            }
          >
            {" "}
            {props.percentage}
          </span>
          <span style={{ color: props.titleColor, fontWeight: 300 }}>
            {" "}
            than last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
