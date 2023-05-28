import React from "react";
import { useLocation } from "react-router-dom";
import PetInfo from "../../Components/petInfo/PetInfo";

export default function PetInformation() {
  const location = useLocation();

  return (
    <div>
      <PetInfo state={location.state} />
    </div>
  );
}
