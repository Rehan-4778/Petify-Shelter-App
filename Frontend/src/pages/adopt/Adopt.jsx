import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar search/Sidebar";
import FeaturedPets from "../../Components/featured pets/FeaturedPets";
import Card from "../../Components/petCard/Card";

export default function Adopt() {
  const [adsData, setAdsData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  const GetPetsData = async () => {
    let petAdsResponse = await fetch(
      "https://petify-shelter-server.vercel.app/api/postAd/fetchallpost",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    let petAdsData = await petAdsResponse.json();
    console.log(petAdsData);

    let featuredPetsResponse = await fetch(
      "https://petify-shelter-server.vercel.app/api/rescue/fetchallrescue",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    let featuredPetsData = await featuredPetsResponse.json();

    console.log(featuredPetsData);

    setAdsData(petAdsData);
    setFeaturedData(featuredPetsData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    GetPetsData();
  }, []);

  return (
    <div style={{ display: "flex", margin: "30px 40px" }}>
      <div style={{ width: "25%" }}>
        <Sidebar />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "7px",
          width: "80%",
          margin: "0 0 0 20px",
          padding: "20px",
          borderRadius: "15px",
          border: "1.5px solid #B66089",
        }}
      >
        {adsData.map((item) => {
          return <Card key={item._id} data={item} />;
        })}
      </div>
    </div>
  );
}
