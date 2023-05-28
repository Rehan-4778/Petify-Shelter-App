import "./home.css";
import React, { useEffect, useState } from "react";
import Header from "../../Components/header/Header";
import FeaturedPets from "../../Components/featured pets/FeaturedPets";
import PetAds from "../../Components/petAds/PetAds";
import Footer from "../../Components/footer/Footer";
import PetifyContext from "../../context/petifyContextApi/petifyContext";

export default function Home() {
  const [adsData, setAdsData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  const GetPetsData = async () => {
    let petAdsResponse = await fetch(
      "https://petify-shelter-server.vercel.app/api/petAd/fetchallads",
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
    setAdsData(petAdsData);

    // let featuredPetsResponse = await fetch(
    //   "https://petify-shelter-server.vercel.app/api/rescue/fetchallrescue",
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       "auth-token": localStorage.getItem("token"),
    //     },
    //   }
    // );

    // let featuredPetsData = await featuredPetsResponse.json();

    // setFeaturedData(featuredPetsData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    GetPetsData();
  }, []);

  return (
    <div className="home">
      <Header />
      <FeaturedPets featuredData={adsData} />
      <PetAds adsData={adsData} />
      <Footer />
    </div>
  );
}
