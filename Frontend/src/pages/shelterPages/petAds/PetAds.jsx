import React, { useEffect, useState } from "react";
import "./petAds.css";
import ListItem from "../../../Components/listItem/ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function PetAds() {
  const [active, setActive] = useState("Incoming");
  const [petAds, setPetAds] = useState([]);

  const getAllAds = async () => {
    const response = await fetch(
      "http://localhost:5000/api/petAd/fetchallads",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("shelter-token"),
        },
      }
    );

    const data = await response.json();
    console.log(data);
    setPetAds(data);
  };

  useEffect(() => {
    getAllAds();
  }, []);

  return (
    <div className="petAds__container">
      <div className="petAds__header">
        <h5 petAds__title>Pets Ads</h5>
      </div>
      <div className="petAds__body">
        <div className="petAds_tags">
          <span
            className={`tag ${active === "Incoming" && "active"}`}
            onClick={() => {
              setActive("Incoming");
            }}
          >
            Incoming
          </span>
          <span
            className={`tag ${active === "Active" && "active"}`}
            onClick={() => {
              setActive("Active");
            }}
          >
            Active
          </span>
          <span
            className={`tag ${active === "Sold" && "active"}`}
            onClick={() => {
              setActive("Sold");
            }}
          >
            Sold
          </span>
        </div>

        <div className="petAds_list">
          <div className="rescue_request_item">
            <span className="rescue_request_item_image heading">Image</span>
            <span className="rescue_request_item_name heading">Location</span>
            <span className="rescue_request_item_date heading">Time</span>
            <span className="rescue_request_item_status heading">Status</span>
            <span className="rescue_request_item_action heading">Action</span>
          </div>
          {active === "Incoming" &&
            petAds.map((item, index) => {
              return (
                item.status === "Pending" && (
                  <ListItem
                    key={index}
                    image={
                      "http://localhost:5000/uploads/images/" + item.images[0]
                    }
                    name={item.name}
                    breed={item.breed}
                    date={item.date}
                    status={item.status}
                    buttonLink="/shelter/adoptionList"
                  />
                )
              );
            })}
          {active === "Active" &&
            petAds.map((item, index) => {
              return (
                item.status === "Active" && (
                  <ListItem
                    key={index}
                    image={
                      "http://localhost:5000/uploads/images/" + item.images[0]
                    }
                    name={item.name}
                    breed={item.breed}
                    date={item.date}
                    status={item.status}
                    buttonLink="/shelter/adoptionList"
                  />
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}
