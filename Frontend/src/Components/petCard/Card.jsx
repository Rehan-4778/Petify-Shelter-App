import React from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const { data } = props;

  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/pet-detail/${data._id}`, {
          state: { id: data._id, data: data },
        });
      }}
    >
      <div className="imgBox">
        <img
          src={"http://localhost:5000/uploads/images/" + data.images[0]}
          alt="pet"
        />
      </div>
      <div className="contentBox">
        <h5>{data.name}</h5>
        <p>{data.description}</p>
      </div>
      <div className="postBtn">
        <button>See Details</button>
      </div>
    </div>
  );
};

export default Card;
