import React, { useState, useEffect } from "react";
import Search from "../../../Components/search/Search";
import "./dashboard.css";
import {
  faKitMedical,
  faSearch,
  faShieldDog,
  faRectangleAd,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../../Components/custom/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const [rescuedPets, setRescuedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [soldPets, setSoldPets] = useState([]);

  const [search, setSearch] = React.useState("");
  const [cardsData, setCardsData] = React.useState([
    {
      icon: faKitMedical,
      title: "Pets Rescued",
      value: "4",
      iconColor: "#26C65D",
    },
    {
      icon: faShieldDog,
      title: "Pets Adopted",
      value: "2",
      iconColor: "#6c5ce7",
    },
    {
      icon: faRectangleAd,
      title: "Pets Sold by Ads",
      value: "5",
      iconColor: "#32383d",
    },
  ]);

  return (
    <div className="shelter__dashboard">
      <div className="dashboard__header">
        <h5 style={{ color: "#333" }}>Dashboard</h5>
      </div>

      <div className="dashboard__body">
        <div className="cards_section">
          {cardsData.map((card, index) => {
            return (
              <Card
                key={index}
                width="28%"
                height="22vh"
                backgroundColor="#FDFDFD"
                borderRadius="0.5rem"
                boxShadow="0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)"
                icon={card.icon}
                iconSize="3x"
                title={card.title}
                titleColor="#777"
                value={card.value}
                valueColor="#333142"
                iconColor={card.iconColor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
