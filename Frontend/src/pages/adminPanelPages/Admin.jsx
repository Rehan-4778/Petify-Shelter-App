import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SideNavbar from "../../Components/sideNavbar/SideNavbar";
import Dashboard from "./dashboard/Dashboard";
import Login from "./authentication/Login";

import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faTent } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import NewShelter from "./newShelter/NewShelter";
import Details from "../../Components/requestDetail/Details";
import Shelter from "./shelters/Shelters";

const Admin = () => {
  const [navItems, setNavItems] = useState([
    {
      icon: faDashboard,
      title: "Dashboard",
      link: "dashboard",
    },
    {
      icon: faTent,
      title: "Shelters",
      link: "shelters",
    },
    {
      icon: faAdd,
      title: "Add Shelter",
      link: "add-shelter",
    },
  ]);

  if (localStorage.getItem("token") === null) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  } else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#4B4B4B",
        }}
      >
        <div style={{ width: "20vw" }}>
          <SideNavbar navItems={navItems} activeColor="#0984e3" />
        </div>

        <div style={{ width: "80vw" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-shelter" element={<NewShelter />} />
            <Route path="/request-detail/:id" element={<Details />} />
            <Route path="/shelters" element={<Shelter />} />
          </Routes>
        </div>
      </div>
    );
};

export default Admin;
