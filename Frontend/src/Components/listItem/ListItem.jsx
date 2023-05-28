import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./listItem.css";
import { useNavigate } from "react-router-dom";

export default function ListItem(props) {
  let navigate = useNavigate();
  return (
    <div className="rescue_request_item">
      <span className="rescue_request_item_image">
        <img src={props.image} alt="pet" width={40} height={40} />
      </span>
      <span className="rescue_request_item_name">{props.name}</span>
      <span className="rescue_request_item_date">
        {new Date(props.date).toLocaleTimeString()}
      </span>
      <span
        className="rescue_request_item_status"
        style={{
          fontWeight: "600",
          color:
            props.status === "Pending"
              ? "red"
              : props.status === "In Process"
              ? "orange"
              : "green",
        }}
      >
        {props.status}
      </span>
      <span className="rescue_request_item_action">
        <button
          className="viewBtn"
          onClick={() => {
            navigate(props.buttonLink, {
              state: { id: props.data._id, data: props.data },
            });
          }}
        >
          View
        </button>
      </span>
    </div>
  );
}
