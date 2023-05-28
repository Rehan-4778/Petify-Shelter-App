import React, { useState } from "react";
import Search from "../../../Components/search/Search";
import "./dashboard.css";
import {
  faUsers,
  faSearch,
  faMoneyCheckDollar,
  faTent,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../../../Components/custom/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const [search, setSearch] = React.useState("");
  const [cardsData, setCardsData] = React.useState([
    {
      icon: faUsers,
      title: "Users",
      value: "5",
      iconColor: "#6c5ce7",
    },
    {
      icon: faMoneyCheckDollar,
      title: "Revenue",
      value: "5,000",
      iconColor: "#00b894",
    },
    {
      icon: faTent,
      title: "Shelters",
      value: "7",
      iconColor: "#2d3436",
    },
  ]);

  return (
    <div className="shelter__dashboard">
      <div className="dashboard__header">
        <h5 style={{ color: "#333" }}>Dashboard</h5>

        {/* <Search
          width="30vw"
          height="6vh"
          icon={faSearch}
          iconMargin="0 1vw 0 1vw"
          iconColor="#777"
          iconSize="16px"
          placeholder="Search"
          placeholderColor="red"
          fontSize="16px"
          color="white"
          backgroundColor="#4B4B4B"
          borderRadius="5px"
          padding="0 1vw 0 1vw"
        /> */}
      </div>

      <div className="dashboard__body">
        <div className="cards_section">
          {cardsData.map((card, index) => {
            return (
              <Card
                key={index}
                width="30%"
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

          {/* <div
            className="filter_data"
            style={{
              width: "15%",
              alignSelf: "flex-start",
              backgroundColor: "#ccc",
              borderRadius: "5px",
              color: "#333",
              padding: "5px 10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>January</span>
            <FontAwesomeIcon icon={faSearch} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
