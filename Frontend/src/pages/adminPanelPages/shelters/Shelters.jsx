import React, { useState, useEffect } from "react";
import ListItem from "../../../Components/listItem/ListItem";
import BASE_URL from "../../../config";

function Shelters() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/shelterAuth/shelters`, {
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
      <h5 style={{ color: "#222" }}>Shelters</h5>
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
            <ListItem
              data={shelter}
              key={shelter._id}
              image={shelter.images[0]}
              name={shelter.name}
              date={shelter.phone}
              status={shelter.status}
              buttonLink={`/admin/request-detail/${shelter._id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Shelters;
