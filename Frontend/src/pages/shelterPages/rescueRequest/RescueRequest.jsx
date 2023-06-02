import React, { useState, useEffect } from "react";
import "./rescueRequest.css";
import ListItem from "../../../Components/listItem/ListItem";
import BASE_URL from "../../../config";

export default function RescueRequest() {
  const [rescueData, setRescueData] = useState([]);

  useEffect(() => {
    const getRescueData = async () => {
      const response = await fetch(`${BASE_URL}/api/rescue/fetchallrescue`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("shelter-token"),
        },
      });
      const json = await response.json();
      if (json.success) {
        setRescueData(json.rescue);
      } else {
        console.log("Error in fetching data");
      }
    };
    getRescueData();
  }, []);

  const [active, setActive] = useState("Incoming Requests");

  return (
    <div className="rescue_request">
      <div className="rescue_request__header">
        <h5 className="rescue_request_title">Rescue Requests</h5>
      </div>

      <div className="rescue_request__body">
        <div className="rescue_request_tags">
          <span
            className={`tag ${active === "Incoming Requests" && "active"}`}
            onClick={() => {
              setActive("Incoming Requests");
            }}
          >
            Incoming Requests
          </span>
          <span
            className={`tag ${active === "In process Requests" && "active"}`}
            onClick={() => {
              setActive("In process Requests");
            }}
          >
            In process Requests
          </span>
          <span
            className={`tag ${active === "Completed Requests" && "active"}`}
            onClick={() => {
              setActive("Completed Requests");
            }}
          >
            Completed Requests
          </span>
        </div>

        <div className="rescue_request_list">
          <div className="rescue_request_item">
            <span className="rescue_request_item_image heading">Image</span>
            <span className="rescue_request_item_name heading">Phone</span>
            <span className="rescue_request_item_date heading">Time</span>
            <span className="rescue_request_item_status heading">Status</span>
            <span className="rescue_request_item_action heading">Action</span>
          </div>
          {active === "Incoming Requests"
            ? rescueData.map((item, index) => {
                // if status is pending then show
                if (item.status === "Pending") {
                  return (
                    <ListItem
                      data={item}
                      key={index}
                      image={item.images[0]}
                      name={item.contactNumber}
                      date={item.date}
                      status={item.status}
                      buttonLink={"/shelter/rescue-detail/" + item._id}
                    />
                  );
                }
              })
            : active === "In process Requests"
            ? rescueData.map((item, index) => {
                // if status is In Process then show
                if (item.status === "In Process") {
                  return (
                    <ListItem
                      data={item}
                      key={index}
                      image={item.images[0]}
                      name={item.contactNumber}
                      date={item.date}
                      status={item.status}
                      buttonLink={"/shelter/rescue-detail/" + item._id}
                    />
                  );
                }
              })
            : active === "Completed Requests"
            ? rescueData.map((item, index) => {
                // if status is Completed then show
                if (item.status === "Completed") {
                  return (
                    <ListItem
                      data={item}
                      key={index}
                      image={item.images[0]}
                      name={item.contactNumber}
                      date={item.date}
                      status={item.status}
                      buttonLink={"/shelter/rescue-detail/" + item._id}
                    />
                  );
                }
              })
            : null}
        </div>
      </div>
    </div>
  );
}
