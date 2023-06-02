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
import LineChart from "../../../Components/Charts/LineChart";
import VerticalBarChart from "../../../Components/Charts/VerticalBarChart";

const Dashboard = () => {
  const [rescuedPets, setRescuedPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [soldPets, setSoldPets] = useState([]);
  const [search, setSearch] = React.useState("");
  const [cardsData, setCardsData] = React.useState([
    {
      icon: faKitMedical,
      title: "Pets Rescued",
      value: 303,
      iconColor: "#26C65D",
      percentage: "-2%",
    },
    {
      icon: faShieldDog,
      title: "Pets Adopted",
      value:  320,
      iconColor: "#6c5ce7",
      percentage: "+2%",
    },
    {
      icon: faRectangleAd,
      title: "Pets Sold by Ads",
      value: 305,
      iconColor: "#32383d",
      percentage: "+5%",
    },
  ]);

  return (
    <div className="shelter__Dashboard">
      <div className="dashboard__header">
        <h5 style={{ color: "#333" }}>Dashboard</h5>
      </div>

      <div className="dashboard__body">
        <div className="cards_section">
          {cardsData.map((card, index) => {
            return (
              <Card
                key={index}
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
                percentage={card.percentage}
              />
            );
          })}
        </div>
        <div className="graphs_section row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-2">
            <LineChart />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-2">
            <VerticalBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
