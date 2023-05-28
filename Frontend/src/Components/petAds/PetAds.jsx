import React from "react";
import "./petAds.css";
import Card from "../petCard/Card";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function PetAds(props) {
  const { adsData } = props;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1465 },
      items: 5,
    },
    largeDesktop: {
      breakpoint: { max: 1465, min: 1250 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1250, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="petAdsSection">
        <div className="container">
          <div className="petAdsHeader">
            <h3>Pet Ads</h3>
          </div>
          <div className="petAdsLink">
            <a href="/">See All Pet Ads</a>
          </div>

          <div className="petAdsContent">
            <Carousel responsive={responsive}>
              {adsData.map((item) => {
                return <Card key={item._id} data={item} />;
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
