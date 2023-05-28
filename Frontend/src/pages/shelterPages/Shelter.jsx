import React, { useEffect, useState } from "react";
import SideNavbar from "../../Components/sideNavbar/SideNavbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Pets from "./pets/Pets";
import RescueRequest from "./rescueRequest/RescueRequest";
import PetAds from "./petAds/PetAds";
import AdoptionList from "./adoptionList/AdoptionList";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";

import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";
import { faKitMedical } from "@fortawesome/free-solid-svg-icons";
import { faRectangleAd } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import RescueDetail from "../../Components/requestDetail/RescueDetail";

export default function Shelter() {
  let navigate = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);
  const [navItems, setNavItems] = useState([
    {
      icon: faDashboard,
      title: "Dashboard",
      link: "dashboard",
    },
    {
      icon: faShieldDog,
      title: "Pets",
      link: "pets",
    },
    {
      icon: faKitMedical,
      title: "Rescue Requests",
      link: "rescue-requests",
    },
    {
      icon: faRectangleAd,
      title: "Pet Ads",
      link: "pet-ads",
    },
    {
      icon: faRectangleList,
      title: "Adoption List",
      link: "adoption-list",
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("shelter-token");
    if (!token) {
      navigate("/shelter/login");
    } else {
      setTokenExists(true);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#4B4B4B",
      }}
    >
      {tokenExists && (
        <div style={{ width: "20vw" }}>
          <SideNavbar navItems={navItems} activeColor="#6c5ce7" />
        </div>
      )}

      <div style={tokenExists ? { width: "80vw" } : { width: "100vw" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/rescue-requests" element={<RescueRequest />} />
          <Route path="/pet-ads" element={<PetAds />} />
          <Route path="/adoption-list" element={<AdoptionList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rescue-detail/:id" element={<RescueDetail />} />
        </Routes>
      </div>
    </div>
  );
}
