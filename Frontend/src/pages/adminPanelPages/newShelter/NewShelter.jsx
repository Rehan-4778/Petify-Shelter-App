import React, { useState, useEffect } from "react";
import ListItem from "../../../Components/listItem/ListItem";

function NewShelter() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/shelterAuth/shelters", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((result) => {
        console.log(result);

        setShelters(result);
      });
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#EFEFEF",
        height: "100vh",
        padding: "1rem 2rem",
      }}
    >
      <h5 style={{ color: "#222" }}>New Shelter</h5>
      <div
        style={{
          margin: "1rem 0",
          height: "90%",
          backgroundColor: "#eee",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <div className="rescue_request_item">
          <span className="rescue_request_item_image heading">Image</span>
          <span className="rescue_request_item_name heading">Name</span>
          <span className="rescue_request_item_date heading">Phone </span>
          <span className="rescue_request_item_status heading">Status</span>
          <span className="rescue_request_item_action heading">Action</span>
        </div>
        {shelters.map((shelter) => {
          return (
            shelter.status === "Pending" && (
              <ListItem
                data={shelter}
                key={shelter._id}
                image="http://localhost:3000/uploads/images/1684793284056-splash.jpg"
                name={shelter.name}
                date={shelter.phone}
                status={shelter.status}
                buttonLink={`/admin/${shelter._id}`}
              />
            )
          );
        })}
      </div>
    </div>
  );
}

export default NewShelter;
