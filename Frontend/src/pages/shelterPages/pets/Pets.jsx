import React, { useState } from "react";
import "./pets.css";
import ListItem from "../../../Components/listItem/ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function Pets() {
  const [pets, setPets] = useState([
    {
      name: "Luna",
      age: "2 years old",
      breed: "Pitbull",
      image: "https://source.unsplash.com/random/100X100/?dog",
    },
    {
      name: "Bush",
      age: "1 years old",
      breed: "Labrador Retriever",
      image: "https://source.unsplash.com/random/100X100/?Labrador Retriever",
    },
    {
      name: "Max",
      age: "4 years old",
      breed: "German Shepherd",
      image: "https://source.unsplash.com/random/100X100/?German Shepherd",
    },
    {
      name: "Daisy",
      age: "2 years old",
      breed: "Golden Retriever",
      image: "https://source.unsplash.com/random/100X100/?puppy",
    },
  ]);

  return (
    <div className="pets__container">
      <div className="pets__header">
        <h5 className="pets__title">Pets</h5>
      </div>
      <div className="pets__body">
        <div className="pets__list">
          <div className="rescue_request_item">
            <span className="rescue_request_item_image heading">Image</span>
            <span className="rescue_request_item_name heading">Name</span>
            <span className="rescue_request_item_date heading">Breed</span>
            <span className="rescue_request_item_status heading">Age</span>
            <span className="rescue_request_item_action heading">Action</span>
          </div>
          {pets.map((pet, index) => (
            <ListItem
              key={index}
              data={pet}
              name={pet.name}
              date={pet.age}
              image={pet.image}
              status={pet.breed}
              buttonLink={"/shelter/pet-detail/" + pet._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
