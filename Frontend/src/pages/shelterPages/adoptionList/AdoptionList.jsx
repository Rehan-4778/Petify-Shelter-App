import React, { useState } from "react";
import "./adoptionList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import ListItem from "../../../Components/listItem/ListItem";

const AdoptionList = () => {
  const adoptionList = [
    {
      name: "Baghban pura",
      date: "10:50 AM",
      status: "Available",
      image: "https://source.unsplash.com/random/100X100/?dog",
    },
    {
      name: "Thokar Niaz Baig",
      date: "12:28 PM",
      status: "Available",
      image: "https://source.unsplash.com/random/100X100/?puppy",
    },
    {
      name: "Wapda Town",
      date: "11:12 AM",
      status: "Available",
      image: "https://source.unsplash.com/random/100X100/?Labrador Retriever",
    },
    {
      name: "Bahria Town",
      date: "4:13 PM",
      status: "Adopted",
      image: "https://source.unsplash.com/random/100X100/?German Shepherd",
    },
  ];

  const [active, setActive] = useState("Available");

  return (
    <div className="adoptionList__container">
      <div className="adoptionList__header">
        <h5 adoptionList__title>Pets for Adoption</h5>
      </div>
      <div className="adoptionList__body">
        <div className="adoptionList_tags">
          <span
            className={`tag ${active === "Available" && "active"}`}
            onClick={() => {
              setActive("Available");
            }}
          >
            Available
          </span>
          <span
            className={`tag ${active === "Adopted" && "active"}`}
            onClick={() => {
              setActive("Adopted");
            }}
          >
            Adopted
          </span>
        </div>

        <div className="rescue_request_list">
          <div className="rescue_request_item">
            <span className="rescue_request_item_image heading">Image</span>
            <span className="rescue_request_item_name heading">Location</span>
            <span className="rescue_request_item_date heading">
              Date & Time
            </span>
            <span className="rescue_request_item_status heading">Status</span>
            <span className="rescue_request_item_action heading">Action</span>
          </div>
          {active === "Available" &&
            adoptionList.length > 0 &&
            adoptionList.map((item, index) => {
              return (
                item.status === "Available" && (
                  <ListItem
                    key={item._id}
                    data={item}
                    image={item.image}
                    name={item.name}
                    date={item.date}
                    status={item.status}
                    buttonLink={"/shelter/adopt-detail/" + item._id}
                  />
                )
              );
            })}
          {active === "Adopted" &&
            adoptionList.length > 0 &&
            adoptionList.map((item, index) => {
              return (
                item.status === "Adopted" && (
                  <ListItem
                    key={item._id}
                    data={item}
                    image={item.image}
                    name={item.name}
                    date={item.date}
                    status={item.status}
                    buttonLink={"/shelter/adopt-detail/" + item._id}
                  />
                )
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AdoptionList;
